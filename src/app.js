// ------------------------------------------------------------------------------
// ----- HRECOS -----------------------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2018 Martyn Smith - USGS NY WSC

// authors:  Martyn J. Smith - USGS NY WSC

// purpose:  HABS Data Viewer

// updates:
// 08.07.2018 - MJS - Created

//CSS imports
import 'bootstrap/dist/css/bootstrap.css';
import 'marker-creator/public/css/markers.css';
import 'leaflet/dist/leaflet.css';
import 'select2/dist/css/select2.css';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css';
import './styles/main.css';

//ES6 imports
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/tab';
import 'select2';
// import 'leaflet-geotiff';
import moment from 'moment';
import Highcharts from 'highcharts';
import addExporting from 'highcharts/modules/exporting';
import addHeatmap from 'highcharts/modules/heatmap';
import 'bootstrap-datepicker';
import { map, control, tileLayer, featureGroup, geoJSON, Icon } from 'leaflet';
import { basemapLayer, dynamicMapLayer } from 'esri-leaflet';
addExporting(Highcharts);
addHeatmap(Highcharts);
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons/faGooglePlusSquare';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons/faGithubSquare';
import { faFlickr } from '@fortawesome/free-brands-svg-icons/faFlickr';
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons/faYoutubeSquare';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';

library.add(faBars, faPlus, faMinus, faInfo, faExclamationCircle, faCog, faQuestionCircle, faTwitterSquare, faFacebookSquare,faGooglePlusSquare, faGithubSquare, faFlickr, faYoutubeSquare, faInstagram );
dom.watch({
  observeMutationsRoot: document.body
});

//START user config variables
var MapX = '-74.58'; //set initial map longitude
var MapY = '41.905'; //set initial map latitude
var MapZoom = 14; //set initial map zoom
var sitesURL = './sitesGeoJSON.json';
var NWISivURL = 'https://nwis.waterservices.usgs.gov/nwis/iv/';
//END user config variables 

//START global variables
var theMap;
var featureCollection;
var baseMapLayer, basemaplayerLabels;
var ngwosSitesLayer;
var weatherLayer = {};
var seriesData;
var siteIDlist = [];
var parameterList = [];
var ajaxQueue = $({});
var metPcodes = ['00020', '75969', '00052', '72252', '00036', '62625', '72269', '00045'];
//END global variables

//instantiate map
$(document).ready(function () {

  console.log('Application Information: ' + process.env.NODE_ENV + ' ' + 'version ' + VERSION);
  $('#appVersion').html('Application Information: ' + process.env.NODE_ENV + ' ' + 'version ' + VERSION);

  initializeMap();
  initListeners();
  loadSites();
  setDates();

  //init ajax queue function
  $.ajaxQueue = function(ajaxOpts) {
    // Hold the original complete function
    var oldComplete = ajaxOpts.complete;
  
    // Queue our ajax request
    ajaxQueue.queue(function(next) {
      // Create a complete callback to invoke the next event in the queue
      ajaxOpts.complete = function() {
        // Invoke the original complete if it was there
        if (oldComplete) {
          oldComplete.apply(this, arguments);
        }
  
        // Run the next query in the queue
        next();
      };
  
      // Run the query
      $.ajax(ajaxOpts);
    });
  };

});

function initializeMap() {
  Icon.Default.imagePath = './images/';

  //create map
  theMap = map('mapDiv', { zoomControl: false, minZoom: 8, });

  //add zoom control with your options
  control.zoom({ position: 'topright' }).addTo(theMap);
  control.scale().addTo(theMap);

  //basemap
  baseMapLayer = basemapLayer('ImageryClarity').addTo(theMap);;

  //init weather layers
  weatherLayer.NexRad = tileLayer('https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png', {opacity : 0.5 });
  weatherLayer.Precip = tileLayer('https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/q2-n1p-900913/{z}/{x}/{y}.png', {opacity : 0.5 });
  weatherLayer.PrecipForecast1hr = dynamicMapLayer({url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_qpf/MapServer', layers: [7], opacity : 0.5, disableCache: true });
  weatherLayer.CloudCoverVisible = tileLayer('https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/goes-vis-1km-900913/{z}/{x}/{y}.png', {opacity : 0.5 });
  weatherLayer.Drought = tileLayer.wms('http://ndmc-001.unl.edu:8080/cgi-bin/mapserv.exe?map=/ms4w/apps/usdm/service/usdm_current_wms.map', {layers : 'usdm_current', bboxSR: 102100, imageSR: 102100, format: 'image/png', transparent: true, f: 'image', nocache: Date.now(), opacity : 0.5});

  // Create map
  // var layer = L.leafletGeotiff(
  //   url='./data/WB_2019_ortho1_4326.tif',
  //   options={band: 0,
  //     displayMin: 0,
  //     displayMax: 360,
  //     name: 'Wind direction',
  //     //colorScale: 'rainbow',
  //     //clampLow: false,
  //     //clampHigh: true,
  //     vector:true,
  //     arrowSize: 20,
  //   }
  // ).addTo(theMap);

  //set initial view
  theMap.setView([MapY, MapX], MapZoom);

  //define layers
  ngwosSitesLayer = featureGroup().addTo(theMap);
}

function initListeners() {

  /*  START EVENT HANDLERS */
  $('#timePeriodSelect').select2({
    dropdownAutoWidth: true,
    minimumResultsForSearch: -1
  });

  $('.basemapBtn').click(function () {
    $('.basemapBtn').removeClass('slick-btn-selection');
    $(this).addClass('slick-btn-selection');
    var baseMap = this.id.replace('btn', '');
    setBasemap(baseMap);
  });

  $('#mobile-main-menu').click(function () {
    $('body').toggleClass('isOpenMenu');
  });

  $('#resetView').click(function () {
    resetView();
  });

  $('#aboutButton').click(function () {
    $('#aboutModal').modal('show');
  });

  $('#showGraph').click(function () {
    getData();
  });
  $('#downloadData').click(function () {
    downloadData();
  });

  $('.weatherBtn').click(function () {
    $(this).toggleClass('slick-btn-selection');
    var lyrID = this.id.replace('btn', '');
    setWeatherLayer(lyrID);
  });

  $('#mapDiv').on("click", '.openGraphingModule', function(){
    var id = String($(this).data('id'));
    $('#stationSelect').select2('val', id);
    openGraphingModule();
  });  

  $('#legend').on("mouseenter", ".site", function(){

    var siteName = $(this).data('sitename');
    var siteID = $(this).data('siteid');

    ngwosSitesLayer.eachLayer(function(geoJSON){
      geoJSON.eachLayer(function(layer) { 
        
        //console.log(siteName,layer.feature.properties['Station Name'])
        if (siteName === layer.feature.properties['Station Name'] && siteID === layer.feature.properties['Site ID']) {
          //center map on new popup
          theMap.flyTo([layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]], 18);

          // , {animate	: true, duration: 2}

          //open popup
          layer.openPopup();

        }
      });
    });
  });

  $('#legend').on("click", ".badge", function(){
    
    $('#stationSelect').val(null).trigger('change');
    $('#parameterSelect').val(null).trigger('change');
    $('#sublocationSelect').val(null).trigger('change');
    $('#graphContainer').html('');

    var siteName = $(this).parent().parent().data('sitename');
    var siteID = $(this).parent().parent().data('siteid');
    var id = String($(this).parent().parent().data('id'));

    console.log('Badge clicked for site name:',$(this).parent().parent().data('sitename'))

    ngwosSitesLayer.eachLayer(function(geoJSON){
      geoJSON.eachLayer(function(layer) {
        if (siteID == layer.feature.properties['Site ID'] && siteName == layer.feature.properties['Station Name']) {

          //select station based on where click was in legend
          $('#stationSelect').val(siteID).trigger("change");

          //hide all substations that dont apply to this station
          filterSublocations([siteID]);

          //lets go
          openGraphingModule();
        }
      });
    });
  });

  $('#legend').on("click", ".siteData", function(){

    console.log('site data click')
    
    $('#stationSelect').val(null).trigger('change');
    $('#parameterSelect').val(null).trigger('change');
    $('#sublocationSelect').val(null).trigger('change');
    $('#graphContainer').html('');

    var pcode_tsid = String($(this).data('pcode_tsid'));
    var pcode = pcode_tsid.split(':')[0];
    var siteName = $(this).data('sitename');
    var siteID = $(this).data('siteid');

    //select station based on where click was in legend
    $('#stationSelect').val(siteID).trigger("change");

    //select pcode:tsid based on where click was in legend
    if (pcode_tsid) {
      $.each(parameterList, function (idx,item) {
        if (item.pcode == pcode) {

          console.log('Found paramater match:',siteID, pcode_tsid);

          $("#sublocationSelect").val(siteID+ ' | ' + siteName).trigger("change");

          $("#parameterSelect").val(item.pcode).trigger("change");

          getData();
          
        }
      });
    }
    openGraphingModule();
  });

  //filter sublocations on any change 
  $('#stationSelect').on('change', function (e) {

    var obj = $("#stationSelect").select2("data");
    var siteIDlist =  obj.map(site => site.value);

    //console.log('station select selection:',  siteIDlist);
    //console.log('filtering sublocations');

    filterSublocations(siteIDlist);
  });


  //filter sublocations on any change 
  $('#sublocationSelect').on('change', function (e) {

    var obj = $("#sublocationSelect").select2("data");
    var sublocationList =  obj.map(subloc => subloc.text);

    //console.log('sublocation select selection:',  sublocationList);
    //console.log('filtering parameterList');

    filterParameterList(sublocationList);

  });

  $('#parameterSelect').on('change', function (e) {

    //clear graph
    $('#graphContainer').html('');

    // var obj = $("#sublocationSelect").select2("data");
    // var sublocationList =  obj.map(subloc => subloc.text);

    // console.log('sublocation select selection:',  sublocationList);
    // console.log('filtering parameterList');

    // filterParameterList(sublocationList);

  });

  ngwosSitesLayer.on('click', function (e) {
    $('#stationSelect').val(null).trigger('change');
    $('#parameterSelect').val(null).trigger('change');
    $('#graphContainer').html('');

    var siteName = e.layer.feature.properties['Station Name'];
    var siteID =  e.layer.feature.properties['Site ID'];
    var id = e.layer.feature.properties['id'];

    $('#stationSelect').select2('val', id);
  });

  ngwosSitesLayer.on("popupopen", function(e){
    //make sure map pans for loaded images
    $(".leaflet-popup-content img").one("load", function(){ e.popup.update(); });
  });

  /*  END EVENT HANDLERS */
}

function filterParameterList(sublocationList) {

  //if the list is empty enable all options
  if (sublocationList.length === 0) {
    $("#parameterSelect option").each(function() {
      $(this).prop('disabled', false);
    });
  }

  $.each(sublocationList, function (idx,subLocation) { 

    var subLoc = subLocation.split(' | ');
    var siteID = subLoc[0];
    var siteName = subLoc[1];
    var pcodeList = [];

    //get available parameters from individual site properties
    ngwosSitesLayer.eachLayer(function(geoJSON){
      geoJSON.eachLayer(function(layer) {

        //console.log('feature loop:', siteID, siteName, layer.feature.properties['Station Name'])

        if (layer.feature.properties['Station Name'] === siteName && layer.feature.properties['Site ID'] === siteID) {
          //console.log('FOUND MATCH',layer.feature.properties);

          //get list of parameters available at this sublocation
          for (var property in layer.feature.properties) {
            if (property.indexOf(':') !== -1) {
              var pcode = property.split(':')[0];
              //console.log('PCODE', pcode);
              if (pcodeList.indexOf(pcode) === -1) pcodeList.push(pcode);

            }
          }
        }

      });
    });

    console.log('pcode list:', pcodeList);


    $("#parameterSelect option").each(function() {

      $(this).prop('disabled', false);
  
      //hide options that dont match
      var optionVal = $(this).val();
  
      //if this sublocation doesnt match a selection station, hide it (with disable + CSS)
      if (pcodeList.indexOf(optionVal) === -1) {
  
        //console.log('hiding sublocation:' , optionVal);
        $(this).prop('disabled', 'disabled');
  
        $('#parameterSelect').trigger('change');
      }
  
      else {
        //console.log('keeping this sublocation:', optionVal);
      }
    });
  });
}

function filterSublocations(siteIDlist) {

  //console.log('filtering sublocations with this list:', siteIDlist);

  //loop over all sublocations
  $("#sublocationSelect option").each(function() {

    $(this).prop('disabled', false);

    //hide options that dont match
    var optionVal = $(this).val().split(' | ')[0];

    //console.log(optionVal, siteIDlist)

    //if this sublocation doesnt match a selection station, hide it (with disable + CSS)
    if (siteIDlist.indexOf(optionVal) === -1) {

      //console.log('hiding sublocation:' , optionVal);
      $(this).prop('disabled', 'disabled');

      $('#sublocationSelect').trigger("change");
    }

    else {
      //console.log('keeping this sublocation:', optionVal);
    }
  });

}

function openGraphingModule() {
  $('#graphModal').modal('show');
}

function setDates() {

  //set datepicker options
  $('.datepicker').datepicker({
    format: 'yyyy-mm-dd'
  });

  var dateObj = new Date();
  var currentDate = formatDate(dateObj);
  var lastWeekDate = formatDate(dateObj.getTime() - (7 * 24 * 60 * 60 * 1000));
  console.log('dates:',currentDate,lastWeekDate);

  $('#startDate').val(lastWeekDate);
  $('#endDate').val(currentDate);

}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function downloadData() {
  
  if (seriesData) {
    $(seriesData).each(function (i, data) {
      
      if (data) {
  
        // start CSV file
        var csvData = [];
        csvData.push('Site Name,"' + data.siteName + '"');
        csvData.push('Site ID,"' + data.siteID + '"');
        csvData.push('Description,"' + data.variableDescription + '"');
        csvData.push('');

        csvData.push('Time,Value');

        $(data.values).each(function (i, value) {
            csvData.push(value.dateTime + ',' + value.value);
        });
    
        //console.log(csvData);
        
        csvData = csvData.join('\n');
    
        var filename = data.siteCode.replace(':','_') + '.csv';
        downloadFile(csvData,filename);
      }
    
      else {
        alert('No data to export');
      }
    });

  }
  else {
    alert('No data to export');
  }

}

function downloadFile(data,filename) {
	var blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(blob, filename);
	} else {
		var link = document.createElement('a');
		var url = URL.createObjectURL(blob);
		if (link.download !== undefined) { // feature detection
			// Browsers that support HTML5 download attribute
			link.setAttribute('href', url);
			link.setAttribute('download', filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
		else {
			window.open(url);
		}
	}
}

function getData() {

  $('#graph-loading').show();
  $('#heatmapContainer').html('');
  $('#graphContainer').html('');

  var requestDatas = [];
  var requestData = {
    format: 'json',
  };

  //----------------------------------------------
  //SHOW SELECTED SITES AS HIGHLIGHTED ON THE MAP
  //----------------------------------------------

  var siteData = $('#stationSelect').select2('data');
  var sublocationData = $('#sublocationSelect').select2('data');
  var siteParameter = $('#parameterSelect').select2('data');

  //validate station and parameter selections
  if (siteData.length === 0 || siteParameter.length === 0) {
    alert('You must choose at least one station and one parameter to continue');
    $('#graph-loading').hide();
    return;
  }

  //time and date stuff
  var timeOption = $('input[name=timeSelect]:checked').val();
  
  //convert periods to start and end dates with moment
  if (timeOption === 'period') {
    var period = $('#timePeriodSelect').select2('data')[0].id;
    requestData.endDT = moment().format('YYYY-MM-DD');
    requestData.startDT = moment().subtract(moment.duration(period)).format('YYYY-MM-DD'); 
  }
  else {
    requestData.startDT = $('#startDate').val();
    requestData.endDT = $('#endDate').val();
  }

  //format selections
  var siteIDs = siteData.map(function(item) {
    return item.value;
  }).join(',');
  requestData.sites = siteIDs;

  var parameterCodeList = siteParameter.map(function(item) {
    return item.value;
  });

  console.log('selected params:',parameterCodeList  )

  var sublocationList = sublocationData.map(function(item) {
    return item.text;
  });

  //seperate pcode list into NWIS params and local params
  var nwisList = [];
  $(parameterCodeList).each(function(idx, li) {
      nwisList.push(li);
  });

  nwisList = nwisList.join(',');
  requestData.parameterCd = nwisList;
  console.log('paramcodes:',nwisList);

  seriesData = [];
  var qualifierFound = false;
  var startTime;

  console.log('Processing', requestDatas.length, 'requests');
  console.log('input Request:',NWISivURL, requestData);

  $.ajax({
    url: NWISivURL, 
    dataType: 'json',
    data:  requestData, 
    type: 'GET',
    success: function(data) {

      console.log('response', data);

      if (data.value.hasOwnProperty('timeSeries') && data.value.timeSeries.length === 0) {
        alert('Found an NWIS site [' + siteIDs + '] but it had no data in waterservices for [' + nwisList + ']');
        $('#graph-loading').hide();
        return;
      }
        
      else if (data.value.length === 0) {
        alert('Found a site [' + siteIDs + '] but it is missing local DB data for [' +  localList + ']');
        $('#graph-loading').hide();
        return;
      }

      startTime = data.value.queryInfo.criteria.timeParam.beginDateTime;  

      console.log('SUBLOC LIST', sublocationList)


      $(data.value.timeSeries).each(function (i, siteParamCombo) {

        var site_name = siteParamCombo.sourceInfo.siteName;

        $(siteParamCombo.values).each(function (i, value) {

          //check here to 
          var method_description = value.method[0].methodDescription;

          //console.log('method desc:',method_description)
          
          var found = false;
          $(sublocationList).each(function (i, subloc) {
            var location = subloc.split(' | ')[1];

            //check for met station
            if (location === 'Met Station') {
              found = true
            }

            //check for sublocation match 
            if (method_description.length > 0 && method_description.indexOf(location) !== -1) {
              //console.log('BANGO', method_description,location)
              found = true
            }

            //check for main site match
            if (method_description.length === 0 && location === site_name) {
              found = true
            }

            //if (!found) console.log('SKIPPING THIS PARAM', location, method_description)
          });

          if (found) {

            //console.log('FOUND A MATCH', method_description, value.value.length )

            //check to make sure there are some values
            if (value.value.length === 0) return;

            //console.log('single timeseries:', value);

            var valueArray = value.value.map(function(item) {
              var seconds = new Date(item.dateTime)/1;

              var itemValue = item.value/1;

              //null out the values if there is a maintenance flag
              if (item.qualifiers.indexOf('Mnt') !== -1 || item.qualifiers.indexOf('Eqp') !== -1) {
                itemValue = null;
                qualifierFound = true;
              }

              return [seconds,itemValue];
            });

            var name;
            if (value.method[0].methodDescription.length > 0) name = siteParamCombo.sourceInfo.siteName + ' | ' + $('<div>').html(siteParamCombo.variable.variableName).text() + ' | ' + value.method[0].methodDescription;
            else name = siteParamCombo.sourceInfo.siteName + ' | ' + $('<div>').html(siteParamCombo.variable.variableName).text();
      
            var series = {
              showInLegend: true,
              values: value,
              data: valueArray,
              color: getRandomColor(),
              siteID: siteParamCombo.sourceInfo.siteCode[0].value,
              siteName: siteParamCombo.sourceInfo.siteName,
              siteCode: siteParamCombo.name,
              variableDescription: siteParamCombo.variable.variableDescription,
              variableName: siteParamCombo.variable.variableName,
              unit: siteParamCombo.variable.unit.unitCode,
              name:name,
            };
      
            seriesData.push(series);
          }

        });
      });

      //check if were done
      if (seriesData.length > 0) {
        showGraph(startTime,seriesData);
      }
      else {
        alert('No data was found for this query')
      }


    }
  });
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function showGraph(startTime,seriesData) {
  console.log('showGraph seriesData',startTime,seriesData);

  //clear out graphContainer
  //$('#graphContainer').html('');


  //if there is some data, show the div
  $('#graphModal').modal('show');

	Highcharts.setOptions({
		global: { useUTC: false },
		lang: { thousandsSep: ','}
  });
  
  //chart init object
  var chartSetup = {
		chart: {
			type: 'line',
			spacingTop: 20,
			spacingLeft: 0,
			spacingBottom: 0,
    },
    plotOptions: {
      series: {
        pointStart: startTime,
        pointInterval: 900000 //15 minutes
      }
    },
		title:{
			text:''
		},
		credits: {
			enabled: false
    },
    tooltip: {
      shared: true
    },
		xAxis: {
			type: "datetime",
			labels: {
				formatter: function () {
					return Highcharts.dateFormat('%m/%d %H%P', this.value);
				},
				//rotation: 90,
				align: 'center',
				tickInterval: 172800 * 1000
			}
    },
		yAxis: [],
		series: []
  };


  //loop over series data so we can match up the axis and series indexes
  $(seriesData).each(function (i, obj) {

    //console.log('series', i, obj)
    var yaxis =   {
      title: { 
        text: obj.unit,
        style: {
          color: obj.color
        }
      },
      labels: {
        style: {
            color: obj.color
        }
      },
      //put odd items on opposite axis
      opposite: isOdd(i)
    };

    var exists = false;
    $(chartSetup.yAxis).each(function (i, data) { 
      console.log('unit compare', data.title.text, obj.unit)
      if (data.title.text == obj.unit) exists = true;
    });

    console.log('yaxis exists:', exists,obj.unit )

    if (!exists) { 
      obj.yAxis = i;
      chartSetup.yAxis.push(yaxis);
    }

    // obj.yAxis = i;
    // chartSetup.yAxis.push(yaxis);

    console.log('here',obj)
    
    chartSetup.series.push(obj);
    
  });

	var chart = Highcharts.chart('graphContainer', chartSetup);
  
  // update colors
  // https://www.highcharts.com/demo/combo-multi-axes
  // https://stackoverflow.com/questions/12419758/changing-series-color-in-highcharts-dynamically
  // https://stackoverflow.com/questions/17837340/highcharts-dynamically-change-axis-title-color

  $('#graph-loading').hide();

}

function initializeFilters(featureCollection) {

  console.log('IN INITIALIZE FILTERS', siteIDlist)

  //sort parameter list
  parameterList.sort((a, b) => a.pcode.localeCompare(b.pcode))
  //console.log('parameter list:',parameterList)

  $('.appFilter').each(function (i, obj) {

    var divID = $(obj).attr('id');
    var selectName = $(obj).data('selectname');
    var selectData = [];

    //console.log('processing:',divID,selectName)

    if (divID === 'stationSelect') {

      $.each(siteIDlist, function (idx,siteID) {
        selectData.push({
          "id":siteID,
          "text": siteID,
          "value":siteID,
        });
      });
    }

    if (divID === 'sublocationSelect') {

      $.each(featureCollection.features, function (idx,feature) {

        selectData.push({
          "id":feature.properties['Site ID'] + ' | ' + feature.properties['Station Name'],
          "text": feature.properties['Site ID'] + ' | ' + feature.properties['Station Name'],
          "value": feature.properties['Site ID'] + ' | ' + feature.properties['Station Name']
        });
      });
    }
    
    if (divID === 'parameterSelect') {

      console.log('parameter list:', parameterList)

      $.each(parameterList, function (idx,item) {
        selectData.push({
          "id":item.pcode,
          "text":item.pcode + ' | ' + item.desc,
          "value": item.pcode
        });
      });

      //console.log('selectData:',selectData)
    }



    $('#' + divID).select2({
      placeholder: selectName,
      data:selectData,
      dropdownAutoWidth: true
    });

    //console.log('checking select data for:', divID, $('#' + divID).find("option"))

    //watch for any change, and spawn a parameter selector for each site that is selected
    $('#' + divID).on('change', function (e) {
      $('#' + divID).select2('data');
    });
  });
}

function addToLegend(properties) {

  var classString = 'wmm-pin wmm-mutedblue wmm-icon-circle wmm-icon-white wmm-size-25';

  if (properties["photoURL"]) classString = 'wmm-pin wmm-mutedred wmm-icon-circle wmm-icon-white wmm-size-25';
  

  $('#legend > tbody').append('<tr class="site table-expander accordion-toggle" data-toggle="collapse" data-target=".siteData' + properties['id'] + '" data-sitename="' + properties['Station Name'] +'" data-id="' + properties['id'] + '" data-siteid="' + properties['Site ID'] + '"><td><div><icon class="siteIcon ' + classString + '" /></div></td><td><span class="siteName">' + properties['Site ID'] + ' | ' + properties['Station Name'] + '</span><span class="ml-2 badge badge-success float-right">Get Data</span></td></tr>');

  $('#legend .siteIcon').attr('style', 'margin-top: -6px !important; margin-left: 3px !important');

  //basic check for data
  if (properties.dateTime) {
    var d = new Date(properties.dateTime);  //2018-08-09T14:45:00.000-05:00
    //var n = properties.dateTime;
    var n = d.toLocaleString();
  
    //add sub-table header
    //var paramData = '<tr><td colspan="2"><table class="table table-sm mb-0"><tbody><tr data-toggle="collapse" data-target=".siteData' + properties['id'] + '" class="table-expander accordion-toggle"><th data-toggle="collapse" data-target=".multi-collapse' + properties['id'] + '" aria-expanded="false">Most recent values as of: ' + n + '<span class="collapse show multi-collapse' + properties['id'] + ' float-right">[+]</span><span class="collapse multi-collapse' + properties['id'] + ' float-right">[-]</span></th><tr>';

    //var paramData = '<tr class="siteData' + properties['id'] + ' accordian-body collapse"><td colspan="2"><table class="table table-sm mb-0"><tbody><tr><th>Most recent values as of: ' + n + '</th><tr>';

    var paramData = '<tr class="siteData' + properties['id'] + ' accordian-body collapse"><td colspan="2"><table id="table' + properties['id']  + '" class="table table-sm mb-0"><tbody><tr><th colspan="2">Most recent values as of: ' + n + '</th><tr>';



    //add values
    $.each(properties, function (key, value) {
      var pcode = key.split(':')[0];
      if (/^\d+$/.test(pcode) && pcode.length === 5) {
        paramData += '<tr style="padding: 0 !important;" class="site siteData" data-sitename="' + properties['Station Name'] +'" data-id="' + properties['id'] + '" data-siteid="' + properties['Site ID'] + '" data-pcode_tsid="' + key + '"><td>' + value.name + '</td><td>' + value.value + '</td></tr>';
      }
  
    });
    paramData += '</tbody></table></td><tr>';
  
    $("#legend > tbody").append(paramData);
    //$('#legend .siteIcon').attr('style', 'margin-top: -6px !important; margin-left: 3px !important');
  }
  else {
    $("#legend > tbody").append('<tr class="siteData' + properties['id'] + ' accordian-body collapse"><td colspan="2"><table class="table table-sm mb-0"><tbody><tr><th colspan="2">No data found in NWIS</th><tr>');
  }

  //sort table values
  sortTable($('#table' + properties['id'] ));

}

function sortTable(table) {
  var tbody = table.find('tbody');

  tbody.find('tr').sort(function(a, b) {
    return $('td:first', a).text().localeCompare($('td:first', b).text());
  }).appendTo(tbody);
}

function loadSites() {

  $.ajax({
    url: sitesURL,
    dataType: 'json',
    success: function (data) {
      console.log('SITES DATA', data)

      //stash the original geoJSON in a global
      featureCollection = data;

      //get siteID list
      var s_ids = featureCollection.features.map(function(item) {
        return item.properties['Site ID'];
      })
      
      //remove duplicates
      siteIDlist = s_ids.filter(function(item,index) { 
        return s_ids.indexOf(item) >= index;
      });
      
      console.log('sitesIDs: ', siteIDlist)

      //get most recent NWIS data
      $.getJSON(NWISivURL, {
          format: 'json',
          sites: siteIDlist.join(','),
          //parameterCd: parameterCodes
        }, function success(data) {
            console.log('NWIS IV Data:',data);

            var idx = 1;

            data.value.timeSeries.forEach(function (NWISdata) {
              var site_data = NWISdata.name.split(':');
              var site_name = NWISdata.sourceInfo.siteName;
              var site_desc = NWISdata.variable.variableDescription;
              var siteID = site_data[1];
              var pcode = site_data[2];
              var pcode_tsid = '';

              //loop over all of the different values for a given pcode
              NWISdata.values.forEach(function (TSID) {
                var tsid = TSID.method[0].methodID.toString();
                var method_description = TSID.method[0].methodDescription;
                pcode_tsid = pcode + ':' + tsid;

                var parameterObj = {
                  "idx": String(idx),
                  "pcode": pcode,
                  //"tsid": tsid,
                  //"meth_desc": method_description,
                  "desc": site_desc
                };

                //push to parameter list if we don't have it yet
                if (!parameterList.some(item => item.pcode === pcode)) {
                  parameterList.push(parameterObj);
                  idx+=1;
                }

                //need to check for and graph the method description to find any sub-sites
                var description, name;
                if (method_description.length > 0) {
                  description = NWISdata.variable.variableDescription + ', ' + method_description;
                  name = NWISdata.variable.variableName + ', ' + method_description;
                }
                else {
                  description = NWISdata.variable.variableDescription;
                  name = NWISdata.variable.variableName;
                }

                //check for met data because there is a seperate station at "01434498"
                if (siteID === "01434498" && metPcodes.includes(pcode)) {
                  //console.log('FOUND A MET PCODE:', pcode);
                  site_name = 'Met Station';
                }

                //check for square bracket to identify sub-site
                if (description.indexOf('[') !== -1) {

                  //make name swap for sorting
                  if (description.indexOf('Depth0cm') !== -1) {

                    description = description.replace('Depth0cm','Depth00cm');
                    name = name.replace('Depth0cm','Depth00cm');
                  }

                  //make name swap for sorting
                  if (description.indexOf('Depth2cm') !== -1) {

                    description = description.replace('Depth2cm','Depth02cm');
                    name = name.replace('Depth2cm','Depth02cm');
                  }

                  if (description.indexOf('Depth5cm') !== -1) {

                    description = description.replace('Depth5cm','Depth05cm');
                    name = name.replace('Depth5cm','Depth05cm');
                  }

                  if (description.indexOf('Depth8cm') !== -1) {

                    description = description.replace('Depth8cm','Depth08cm');
                    name = name.replace('Depth8cm','Depth08cm');
                  }
                  

                  var bracketString = description.split('[')[1].split(']')[0];
    
                  //additional check for VWC
                  if (bracketString.indexOf('VWC') !== -1) {
                    site_name = bracketString.split('.')[0] + '.' + bracketString.split('.')[1];
                  }

                  else if (bracketString.indexOf('Side Channel') !== -1) {
                    site_name = 'Side Channel';
                  }

                  else if (bracketString.indexOf('Piezometer2') !== -1) {
                    site_name = 'Piezometer2';
                  }

                  else if (bracketString.indexOf('Piezometer3') !== -1) {
                    site_name = 'Piezometer3';
                  }

                  else {
                    site_name = bracketString.split('.')[0]
                  }

                  //console.log('FOUND A SUBSITE for ' + siteID + ':' + bracketString + '|' + subSiteID);
                }

                //match data to geoJSON features
                featureCollection.features.forEach(function (feature, index) {

                  //write an index value to the feature properties (used in the legend)
                  feature.properties.id = index;

                  //make sure were on the right site
                  if (siteID === feature.properties['Site ID']) {

                    if (site_name === feature.properties["Station Name"]) {

                      //check if this is a gage house and rename if so
                      // if (feature.properties["photoURL"]) {
                      //   feature.properties["Station Name"] = 'Gage House';
                      // }

                      if (!(pcode_tsid in feature.properties) ) {
                        feature.properties[pcode_tsid] = {};
                        feature.properties[pcode_tsid].value = TSID.value[0].value;
                        
                        //null out the values if there is a maintenance flag
                        if (TSID.value[0].qualifiers.indexOf('Mnt') !== -1 || TSID.value[0].qualifiers.indexOf('Eqp') !== -1 || TSID.value[0].qualifiers.indexOf('Ssn') !== -1) {
                          feature.properties[pcode_tsid].value = null;
                        }

                        feature.properties.dateTime = TSID.value[0].dateTime;
                        feature.properties[pcode_tsid].dateTime = TSID.value[0].dateTime;
                        feature.properties[pcode_tsid].qualifiers = TSID.value[0].qualifiers;
                        feature.properties[pcode_tsid].description = description;
                        feature.properties[pcode_tsid].name = name;
                      }
                    }
                  }

                  //console.log('feature:',feature)

                });
              });
            });

            //if (!foundSiteID) console.log('no data found for:',feature.properties['Site ID'])  



            //console.log('feats',featureCollection)
            var geoJSONlayer = geoJSON(featureCollection, {
              pointToLayer: function (feature, latlng) {

                var classString = 'wmm-pin wmm-mutedblue wmm-icon-circle wmm-icon-white wmm-size-25';

                if (feature.properties["photoURL"]) classString = 'wmm-pin wmm-mutedred wmm-icon-circle wmm-icon-white wmm-size-25';
          
                //console.log('last check',feature.properties)
                addToLegend(feature.properties);

                var icon = L.divIcon({ className: classString });
                return L.marker(latlng, { icon: icon });
              },
              onEachFeature: function(feature, layer) {
                var popupContent = '<b>Site ID: </b><a href="https://waterdata.usgs.gov/nwis/uv/?site_no=' + feature.properties['Site ID'] + '" target="_blank">' + feature.properties['Site ID'] + '</a><br><b>Station Name:</b> ' + feature.properties['Station Name'];

                if (feature.properties['photoURL'] && feature.properties['photoURL'].length > 0) {
                  popupContent += '<br><a href="' + feature.properties['photoURL'] + '" target="_blank"><img style="width:100%" src=' + feature.properties['photoURL'] + ' alt="Site Photo"></a>';
                }

                popupContent += '<br><h5><span class="openGraphingModule ml-2 badge badge-success" data-sitename="' + feature.properties['Station Name'] +'" data-id="' + feature.properties['id'] + '" data-siteid="' + feature.properties['Site ID'] + '" >Get Data</span></h5>';

                layer.bindPopup(popupContent);

                //console.log('feature:',feature.properties)
              }
            });
          
            ngwosSitesLayer.addLayer(geoJSONlayer);
            
            initializeFilters(featureCollection);

            // call a function on complete 
            $('#loading').hide();
            $('#legend').show();
      });

    }
  });
}

function setBasemap(baseMap) {

  switch (baseMap) {
    case 'Sentinel': baseMap = 'Sentinel'; break;
    case 'Streets': baseMap = 'Streets'; break;
    case 'Satellite': baseMap = 'Imagery'; break;
    case 'Clarity': baseMap = 'ImageryClarity'; break;
    case 'Topo': baseMap = 'Topographic'; break;
    case 'Terrain': baseMap = 'Terrain'; break;
    case 'Gray': baseMap = 'Gray'; break;
    case 'DarkGray': baseMap = 'DarkGray'; break;
    case 'NatGeo': baseMap = 'NationalGeographic'; break;
  }

  if (baseMapLayer) theMap.removeLayer(baseMapLayer);
  baseMapLayer = basemapLayer(baseMap);
  theMap.addLayer(baseMapLayer);
  if (basemaplayerLabels) theMap.removeLayer(basemaplayerLabels);
  if (baseMap === 'Gray' || baseMap === 'DarkGray' || baseMap === 'Imagery' || baseMap === 'Terrain') {
    basemaplayerLabels = basemapLayer(baseMap + 'Labels');
    theMap.addLayer(basemaplayerLabels);
  }
}

function setWeatherLayer(layer) {

  var layerName = weatherLayer[layer];
  
  //first check if weve added this already
  if(theMap.hasLayer(layerName)) theMap.removeLayer(layerName)
  else theMap.addLayer(layerName);
}

function isOdd(n) {
  return !!(n % 2);
}