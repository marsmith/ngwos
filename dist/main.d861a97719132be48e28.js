!function(e){function n(n){for(var t,i,s=n[0],l=n[1],c=n[2],d=0,u=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&u.push(a[i][0]),a[i]=0;for(t in l)Object.prototype.hasOwnProperty.call(l,t)&&(e[t]=l[t]);for(p&&p(n);u.length;)u.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,n=0;n<o.length;n++){for(var r=o[n],t=!0,s=1;s<r.length;s++){var l=r[s];0!==a[l]&&(t=!1)}t&&(o.splice(n--,1),e=i(i.s=r[0]))}return e}var t={},a={0:0},o=[];function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,n,r){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)i.d(r,t,function(n){return e[n]}.bind(null,t));return r},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=n,s=s.slice();for(var c=0;c<s.length;c++)n(s[c]);var p=l;o.push([34,1]),r()}({34:function(e,n,r){"use strict";r.r(n),function(e){r(35),r(38),r(40),r(46),r(48),r(50),r(7),r(52),r(53),r(54),r(55);var n=r(1),t=r.n(n),a=r(3),o=r.n(a),i=r(18),s=r.n(i),l=r(19),c=r.n(l),p=(r(58),r(0)),d=r(6),u=r(9),m=r(20),g=r(23),h=r(21),f=r(22),b=r(24),v=r(26),y=r(25),x=r(27),w=r(28),S=r(29),D=r(30),k=r(31),I=r(32),O=r(33);s()(o.a),c()(o.a),u.b.add(m.faBars,h.faPlus,f.faMinus,g.faInfo,b.faExclamationCircle,y.faCog,v.faQuestionCircle,x.faTwitterSquare,w.faFacebookSquare,S.faGooglePlusSquare,D.faGithubSquare,k.faFlickr,I.faYoutubeSquare,O.faInstagram),u.a.watch({observeMutationsRoot:document.body});var N,T,_,C,j,E,M="https://nwis.waterservices.usgs.gov/nwis/iv/",z={},F=[],q=[];function P(n){e("#sublocationSelect option").each((function(){e(this).prop("disabled",!1);var r=e(this).val().split(" | ")[0];-1===n.indexOf(r)&&(e(this).prop("disabled","disabled"),e("#sublocationSelect").trigger("change"))}))}function G(){e("#graphModal").modal("show")}function A(e){var n=new Date(e),r=""+(n.getMonth()+1),t=""+n.getDate(),a=n.getFullYear();return r.length<2&&(r="0"+r),t.length<2&&(t="0"+t),[a,r,t].join("-")}function R(){e("#graph-loading").show(),e("#heatmapContainer").html(""),e("#graphContainer").html("");var n={format:"json",access:"2"},r=e("#stationSelect").select2("data"),a=e("#sublocationSelect").select2("data"),i=e("#parameterSelect").select2("data");if(0===r.length||0===i.length)return alert("You must choose at least one station and one parameter to continue"),void e("#graph-loading").hide();if("period"===e("input[name=timeSelect]:checked").val()){var s=e("#timePeriodSelect").select2("data")[0].id;n.endDT=t()().format("YYYY-MM-DD"),n.startDT=t()().subtract(t.a.duration(s)).format("YYYY-MM-DD")}else n.startDT=e("#startDate").val(),n.endDT=e("#endDate").val();var l=r.map((function(e){return e.value})).join(",");n.sites=l;var c=i.map((function(e){return e.value}));console.log("selected params:",c);var p=a.map((function(e){return e.text})),d=[];e(c).each((function(e,n){d.push(n)})),d=d.join(","),n.parameterCd=d,console.log("paramcodes:",d),E=[];var u;console.log("Processing",[].length,"requests"),console.log("input Request:",M,n),e.ajax({url:M,dataType:"json",data:n,type:"GET",success:function(n){return console.log("response",n),n.value.hasOwnProperty("timeSeries")&&0===n.value.timeSeries.length?(alert("Found an NWIS site ["+l+"] but it had no data in waterservices for ["+d+"]"),void e("#graph-loading").hide()):0===n.value.length?(alert("Found a site ["+l+"] but it is missing local DB data for ["+localList+"]"),void e("#graph-loading").hide()):(u=n.value.queryInfo.criteria.timeParam.beginDateTime,console.log("SUBLOC LIST",p),e(n.value.timeSeries).each((function(n,r){var t=r.sourceInfo.siteName;e(r.values).each((function(n,a){var o=a.method[0].methodDescription,i=!1;if(e(p).each((function(e,n){var r=n.split(" | ")[1];"Met Station"===r&&(i=!0),o.length>0&&-1!==o.indexOf(r)&&(i=!0),0===o.length&&r===t&&(i=!0),"BISCUIT BROOK (NY68) NADP STATION AT FROST VALLEY"===r&&(i=!0)})),i){if(0===a.value.length)return;var s,l=a.value.map((function(e){var n=new Date(e.dateTime)/1,r=e.value/1;return-1===e.qualifiers.indexOf("Mnt")&&-1===e.qualifiers.indexOf("Eqp")||(r=null,!0),[n,r]}));s=a.method[0].methodDescription.length>0?r.sourceInfo.siteName+" | "+e("<div>").html(r.variable.variableName).text()+" | "+a.method[0].methodDescription:r.sourceInfo.siteName+" | "+e("<div>").html(r.variable.variableName).text();var c={showInLegend:!0,values:a,data:l,color:U(),siteID:r.sourceInfo.siteCode[0].value,siteName:r.sourceInfo.siteName,siteCode:r.name,variableDescription:r.variable.variableDescription,variableName:r.variable.variableName,unit:r.variable.unit.unitCode,name:s};E.push(c)}}))})),void(E.length>0?function(n,r){console.log("showGraph seriesData",n,r),e("#graphModal").modal("show"),o.a.setOptions({global:{useUTC:!1},lang:{thousandsSep:","}});var t={chart:{type:"line",spacingTop:20,spacingLeft:0,spacingBottom:0},plotOptions:{series:{pointStart:n,pointInterval:9e5}},title:{text:""},credits:{enabled:!1},tooltip:{shared:!0},xAxis:{type:"datetime",labels:{formatter:function(){return o.a.dateFormat("%m/%d %H%P",this.value)},align:"center",tickInterval:1728e5}},yAxis:[],series:[]};e(r).each((function(n,r){var a,o={title:{text:r.unit,style:{color:r.color}},labels:{style:{color:r.color}},opposite:(a=n,!!(a%2))},i=!1;e(t.yAxis).each((function(e,n){console.log("unit compare",n.title.text,r.unit),n.title.text==r.unit&&(i=!0)})),console.log("yaxis exists:",i,r.unit),i||(r.yAxis=n,t.yAxis.push(o)),console.log("here",r),t.series.push(r)}));o.a.chart("graphContainer",t);e("#graph-loading").hide()}(u,E):alert("No data was found for this query")))}})}function U(){for(var e="#",n=0;n<6;n++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}e(document).ready((function(){console.log("Application Information: production version 0.0.1"),e("#appVersion").html("Application Information: production version 0.0.1"),p.Icon.Default.imagePath="./images/",N=Object(p.map)("mapDiv",{zoomControl:!1,minZoom:8}),p.control.zoom({position:"topright"}).addTo(N),p.control.scale().addTo(N),_=Object(d.a)("Streets").addTo(N),z.Ortho01435000=L.tileLayer.wms("https://www.sciencebase.gov/catalogMaps/mapping/ows/5eb96d0482ce25b5135d25bb?",{layers:"sb:01435000_2019_visible_light_ortho",transparent:!0,format:"image/png",maxZoom:28}),z.Thermal01435000=L.tileLayer.wms("https://www.sciencebase.gov/catalogMaps/mapping/ows/5eb96d0482ce25b5135d25bb?",{layers:"sb:01435000_2019_thermal_ortho_abs_temp",transparent:!0,format:"image/png",maxZoom:28}),z.Ortho01434498=L.tileLayer.wms("https://www.sciencebase.gov/catalogMaps/mapping/ows/5eb96d0482ce25b5135d25bb?",{layers:"sb:01434498_2019_visible_light_ortho",transparent:!0,format:"image/png",maxZoom:28}),z.Thermal01434498=L.tileLayer.wms("https://www.sciencebase.gov/catalogMaps/mapping/ows/5eb96d0482ce25b5135d25bb?",{layers:"sb:01434498_2019_thermal_ortho_abs_temp",transparent:!0,format:"image/png",maxZoom:28}),z.NexRad=Object(p.tileLayer)("https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png",{opacity:.5}),z.Precip=Object(p.tileLayer)("https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/q2-n1p-900913/{z}/{x}/{y}.png",{opacity:.5}),z.PrecipForecast1hr=Object(d.b)({url:"https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_qpf/MapServer",layers:[7],opacity:.5,disableCache:!0}),z.CloudCoverVisible=Object(p.tileLayer)("https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/goes-vis-1km-900913/{z}/{x}/{y}.png",{opacity:.5}),z.Drought=p.tileLayer.wms("http://ndmc-001.unl.edu:8080/cgi-bin/mapserv.exe?map=/ms4w/apps/usdm/service/usdm_current_wms.map",{layers:"usdm_current",bboxSR:102100,imageSR:102100,format:"image/png",transparent:!0,f:"image",nocache:Date.now(),opacity:.5}),N.setView(["41.905","-74.58"],14),j=Object(p.featureGroup)().addTo(N),e("#timePeriodSelect").select2({dropdownAutoWidth:!0,minimumResultsForSearch:-1}),e(".basemapBtn").click((function(){e(".basemapBtn").removeClass("slick-btn-selection"),e(this).addClass("slick-btn-selection"),function(e){switch(e){case"Streets":e="Streets";break;case"Imagery":e="Imagery";break;case"Clarity":e="ImageryClarity";break;case"Firefly":e="ImageryFirefly";break;case"Topo":e="Topographic";break;case"Gray":e="Gray";break;case"DarkGray":e="DarkGray";break;case"NatGeo":e="NationalGeographic"}_&&N.removeLayer(_),_=Object(d.a)(e),N.addLayer(_),C&&N.removeLayer(C),"Gray"!==e&&"DarkGray"!==e&&"Imagery"!==e&&"Terrain"!==e||(C=Object(d.a)(e+"Labels"),N.addLayer(C))}(this.id.replace("btn",""))})),e("#mobile-main-menu").click((function(){e("body").toggleClass("isOpenMenu")})),e("#resetView").click((function(){resetView()})),e("#aboutButton").click((function(){e("#aboutModal").modal("show")})),e("#showGraph").click((function(){R()})),e("#downloadData").click((function(){E?e(E).each((function(n,r){if(r){var t=[];t.push('Site Name,"'+r.siteName+'"'),t.push('Site ID,"'+r.siteID+'"'),t.push('Description,"'+r.variableDescription+'"'),t.push(""),t.push("Time,Value"),e(r.values).each((function(e,n){t.push(n.dateTime+","+n.value)})),t=t.join("\n");var a=r.siteCode.replace(":","_")+".csv";!function(e,n){var r=new Blob([e],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(r,n);else{var t=document.createElement("a"),a=URL.createObjectURL(r);void 0!==t.download?(t.setAttribute("href",a),t.setAttribute("download",n),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t)):window.open(a)}}(t,a)}else alert("No data to export")})):alert("No data to export")})),e(".overlayBtn").click((function(){e(this).toggleClass("slick-btn-selection");var n,r=this.id.replace("btn","");n=z[r],N.hasLayer(n)?N.removeLayer(n):(N.addLayer(n),n.bringToFront())})),e("#mapDiv").on("click",".openGraphingModule",(function(){console.log("this",this);var n=String(e(this).data("siteid")),r=n+" | "+String(e(this).data("sitename"));e("#stationSelect").val(n).trigger("change"),e("#sublocationSelect").val(r).trigger("change"),P([n]),G()})),e("#legend").on("click",".site",(function(){var n=e(this).data("sitename"),r=String(e(this).data("siteid"));j.eachLayer((function(e){e.eachLayer((function(e){n===e.feature.properties["Station Name"]&&r===e.feature.properties["Site ID"]&&(N.getZoom()>14?N.panTo([e.feature.geometry.coordinates[1],e.feature.geometry.coordinates[0]]):N.flyTo([e.feature.geometry.coordinates[1],e.feature.geometry.coordinates[0]],18),e.openPopup())}))}))})),e("#legend").on("click",".badge",(function(){e("#stationSelect").val(null).trigger("change"),e("#parameterSelect").val(null).trigger("change"),e("#sublocationSelect").val(null).trigger("change"),e("#graphContainer").html("");var n=e(this).parent().parent().data("sitename"),r=e(this).parent().parent().data("siteid"),t=r+" | "+n;console.log("Badge clicked for site name:",e(this).parent().parent().data("sitename")),j.eachLayer((function(a){a.eachLayer((function(a){r==a.feature.properties["Site ID"]&&n==a.feature.properties["Station Name"]&&(e("#stationSelect").val(r).trigger("change"),e("#sublocationSelect").val(t).trigger("change"),P([r]),G())}))}))})),e("#legend").on("click",".siteData",(function(){console.log("site data click"),e("#stationSelect").val(null).trigger("change"),e("#parameterSelect").val(null).trigger("change"),e("#sublocationSelect").val(null).trigger("change"),e("#graphContainer").html("");var n=String(e(this).data("pcode_tsid")),r=n.split(":")[0],t=e(this).data("sitename"),a=e(this).data("siteid");e("#stationSelect").val(a).trigger("change"),n&&e.each(q,(function(o,i){i.pcode==r&&(console.log("Found paramater match:",a,n),e("#sublocationSelect").val(a+" | "+t).trigger("change"),e("#parameterSelect").val(i.pcode).trigger("change"),R())})),G()})),e("#stationSelect").on("change",(function(n){P(e("#stationSelect").select2("data").map(e=>e.value))})),e("#sublocationSelect").on("change",(function(n){console.log("sublocationselect has changed"),function(n){0===n.length&&e("#parameterSelect option").each((function(){e(this).prop("disabled",!1)})),e.each(n,(function(n,r){var t=r.split(" | "),a=t[0],o=t[1],i=[];j.eachLayer((function(e){e.eachLayer((function(e){if(e.feature.properties["Station Name"]===o&&e.feature.properties["Site ID"]===a)for(var n in e.feature.properties)if(-1!==n.indexOf(":")){var r=n.split(":")[0];-1===i.indexOf(r)&&i.push(r)}}))})),e("#parameterSelect option").each((function(){e(this).prop("disabled",!1);var n=e(this).val();-1===i.indexOf(n)&&(e(this).prop("disabled","disabled"),e("#parameterSelect").trigger("change"))}))}))}(e("#sublocationSelect").select2("data").map(e=>e.text))})),e("#parameterSelect").on("change",(function(n){e("#graphContainer").html("")})),j.on("click",(function(n){e("#stationSelect").val(null).trigger("change"),e("#parameterSelect").val(null).trigger("change"),e("#graphContainer").html(""),n.layer.feature.properties["Station Name"],n.layer.feature.properties["Site ID"];var r=n.layer.feature.properties.id;e("#stationSelect").select2("val",r)})),j.on("popupopen",(function(n){e(".leaflet-popup-content img").on("load",(function(){n.popup.update()}))})),e.ajax({url:"./sitesGeoJSON.json",dataType:"json",success:function(n){console.log("SITES DATA",n);var r=(T=n).features.map((function(e){return e.properties["Site ID"]}));F=r.filter((function(e,n){return r.indexOf(e)>=n})),console.log("sitesIDs: ",F),e.getJSON(M,{format:"json",sites:F.join(","),access:"2"},(function(n){console.log("NWIS IV Data:",n);var r=1;n.value.timeSeries.forEach((function(e){var n=e.name.split(":"),t=e.sourceInfo.siteName,a=e.variable.variableDescription,o=String(n[1]),i=n[2],s="";e.values.forEach((function(n){var l=n.method[0].methodID.toString(),c=n.method[0].methodDescription;s=i+":"+l;var p,d,u={idx:String(r),pcode:i,desc:a};if(q.some(e=>e.pcode===i)||(q.push(u),r+=1),c.length>0?(p=e.variable.variableDescription+", "+c,d=e.variable.variableName+", "+c):(p=e.variable.variableDescription,d=e.variable.variableName),-1!==p.indexOf("[")&&-1!==p.indexOf("]")){var m=p.split("[")[1].split("]")[0],g=m.split(".");1===g.length?t=m:g.length>1?t=g[0]:console.log("Something weird with bracketString:",m)}T.features.forEach((function(e,r){e.properties.id=r,o===e.properties["Site ID"]&&(t===e.properties["Station Name"]&&(s in e.properties||(e.properties[s]={},e.properties[s].value=n.value[0].value,-1===n.value[0].qualifiers.indexOf("Mnt")&&-1===n.value[0].qualifiers.indexOf("Eqp")&&-1===n.value[0].qualifiers.indexOf("Ssn")||(e.properties[s].value=null),e.properties.dateTime=n.value[0].dateTime,e.properties[s].dateTime=n.value[0].dateTime,e.properties[s].qualifiers=n.value[0].qualifiers,e.properties[s].description=p,e.properties[s].name=d)),"415937074301201"===o&&(s in e.properties||(e.properties[s]={},e.properties[s].value=n.value[0].value,-1===n.value[0].qualifiers.indexOf("Mnt")&&-1===n.value[0].qualifiers.indexOf("Eqp")&&-1===n.value[0].qualifiers.indexOf("Ssn")||(e.properties[s].value=null),e.properties.dateTime=n.value[0].dateTime,e.properties[s].dateTime=n.value[0].dateTime,e.properties[s].qualifiers=n.value[0].qualifiers,e.properties[s].description=p,e.properties[s].name=d)))}))}))}));var t=Object(p.geoJSON)(T,{pointToLayer:function(n,r){var t="wmm-pin wmm-mutedblue wmm-icon-circle wmm-icon-white wmm-size-25";n.properties.photoURL&&(t="wmm-pin wmm-mutedred wmm-icon-circle wmm-icon-white wmm-size-25"),function(n){var r,t,a="wmm-pin wmm-mutedblue wmm-icon-circle wmm-icon-white wmm-size-25";if(n.photoURL&&(a="wmm-pin wmm-mutedred wmm-icon-circle wmm-icon-white wmm-size-25"),e("#legend > tbody").append('<tr class="site table-expander accordion-toggle" data-toggle="collapse" data-target=".siteData'+n.id+'" data-sitename="'+n["Station Name"]+'" data-id="'+n.id+'" data-siteid="'+n["Site ID"]+'"><td><div><icon class="siteIcon '+a+'" /></div></td><td><span class="siteName">'+n["Site ID"]+" | "+n["Station Name"]+'</span><span class="ml-2 badge badge-success float-right">Get Data</span></td></tr>'),e("#legend .siteIcon").attr("style","margin-top: -6px !important; margin-left: 3px !important"),n.dateTime){var o=new Date(n.dateTime).toLocaleString(),i='<tr class="siteData'+n.id+' accordian-body collapse"><td colspan="2"><table id="table'+n.id+'" class="table table-sm mb-0"><tbody><tr><th colspan="2">Most recent values as of: '+o+"</th><tr>";e.each(n,(function(e,r){var t=e.split(":")[0];/^\d+$/.test(t)&&5===t.length&&(i+='<tr style="padding: 0 !important;" class="site siteData" data-sitename="'+n["Station Name"]+'" data-id="'+n.id+'" data-siteid="'+n["Site ID"]+'" data-pcode_tsid="'+e+'"><td>'+r.name+"</td><td>"+r.value+"</td></tr>")})),i+="</tbody></table></td><tr>",e("#legend > tbody").append(i)}else e("#legend > tbody").append('<tr class="siteData'+n.id+' accordian-body collapse"><td colspan="2"><table class="table table-sm mb-0"><tbody><tr><th colspan="2">No data found in NWIS</th><tr>');r=e("#table"+n.id),(t=r.find("tbody")).find("tr").sort((function(n,r){return e("td:first",n).text().localeCompare(e("td:first",r).text())})).appendTo(t)}(n.properties);var a=L.divIcon({className:t});return L.marker(r,{icon:a})},onEachFeature:function(e,n){var r='<b>Site ID: </b><a href="https://waterdata.usgs.gov/nwis/uv/?site_no='+e.properties["Site ID"]+'" target="_blank">'+e.properties["Site ID"]+"</a><br><b>Station Name:</b> "+e.properties["Station Name"];e.properties.photoURL&&e.properties.photoURL.length>0&&(r+='<br><a href="'+e.properties.photoURL+'" target="_blank"><img style="width:100%" src='+e.properties.photoURL+' alt="Site Photo"></a>'),e.properties.thermalURL&&e.properties.thermalURL.length>0&&(r+='<br><b>Image: </b><br><a href="'+e.properties.thermalURL+'" target="_blank"><img style="width:100%" src='+e.properties.thermalURL+' alt="Image"></a>'),r+='<br><h5><span class="openGraphingModule ml-2 badge badge-success" data-sitename="'+e.properties["Station Name"]+'" data-id="'+e.properties.id+'" data-siteid="'+e.properties["Site ID"]+'" >Get Data</span></h5>',n.bindPopup(r)}});j.addLayer(t),function(n){console.log("IN INITIALIZE FILTERS",F),q.sort((e,n)=>e.pcode.localeCompare(n.pcode)),e(".appFilter").each((function(r,t){var a=e(t).attr("id"),o=e(t).data("selectname"),i=[];"stationSelect"===a&&e.each(F,(function(e,n){i.push({id:n,text:n,value:n})})),"sublocationSelect"===a&&e.each(n.features,(function(e,n){i.push({id:n.properties["Site ID"]+" | "+n.properties["Station Name"],text:n.properties["Site ID"]+" | "+n.properties["Station Name"],value:n.properties["Site ID"]+" | "+n.properties["Station Name"]})})),"parameterSelect"===a&&(console.log("parameter list:",q),e.each(q,(function(e,n){i.push({id:n.pcode,text:n.pcode+" | "+n.desc,value:n.pcode})}))),e("#"+a).select2({placeholder:o,data:i,dropdownAutoWidth:!0}),e("#"+a).on("change",(function(n){e("#"+a).select2("data")}))}))}(T),e("#loading").hide(),e("#legend").show()}))}}),function(){e(".datepicker").datepicker({format:"yyyy-mm-dd"});var n=new Date,r=A(n),t=A(n.getTime()-6048e5);console.log("dates:",r,t),e("#startDate").val(t),e("#endDate").val(r)}()}))}.call(this,r(2))},50:function(e,n,r){var t=r(51);"string"==typeof t&&(t=[[e.i,t,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r(5)(t,a);t.locals&&(e.exports=t.locals)},51:function(e,n,r){(e.exports=r(4)(!1)).push([e.i,"/* Hide disabled options in select2 dropdowns */\r\n.select2-results__options .select2-results__option[aria-disabled=true] {\r\n  display: none;\r\n}\r\n\r\n@media (min-width: 992px) {\r\n  .modal-dialog {\r\n    max-width: 60%;\r\n  }\r\n}\r\n\r\n#loading {\r\n  background: #e9e9e9;\r\n  /* position: absolute; */\r\n  height:200px;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  opacity: 0.75;\r\n}\r\n\r\n#loading .load-text {\r\n  text-align: center;\r\n  position: relative;\r\n  top: 50%;\r\n  transform: translateY(-50%); \r\n}\r\n\r\n.tooltip-body{\r\n  width: 400px;\r\n  white-space:normal;\r\n  z-index:9999 !important;\r\n}\r\n\r\n/*\r\n    ===========================\r\n    ===========================\r\n         Navigation Bar\r\n    ===========================\r\n    ===========================\r\n*/\r\n\r\n.top-menu-btn{\r\n  background-color: transparent;\r\n  border: none;\r\n  color: rgba(255,255,255,0.5);\r\n  font-weight: 400;\r\n  text-transform: uppercase;\r\n  letter-spacing: 1.5px;\r\n  font-size: 12pt;\r\n  margin: 18px auto;\r\n  float: right;\r\n}\r\n.top-menu-btn:hover{\r\n  font-size: 12pt;\r\n  background-color: transparent;\r\n  border: none;\r\n  color: rgba(255,255,255,0.8)\r\n}\r\n.top-menu-btn:focus{\r\n  background-color: transparent;\r\n  border: none;\r\n  color: rgba(255,255,255,0.8);\r\n  font-size: 12pt;\r\n}\r\n.top-menu-btn:active{\r\n  color: rgba(255,255,255,1) !important;\r\n  background-color: transparent !important;\r\n  font-size: 12pt;\r\n  border: none;\r\n}\r\n\r\n.top-menu-brand {\r\n  padding: 14px 14px 10px;\r\n}\r\n\r\n.top-menu-brand > img {\r\n  height: 40px;\r\n}\r\n\r\n.top-menu-brand.dec-logo > img {\r\n  filter: invert(100%);\r\n}\r\n\r\n.app-name{\r\n  position: relative;\r\n  top:2px;\r\n  font-weight:300;\r\n}\r\n\r\n.app-name {\r\nposition: relative;\r\nwidth: 100%;\r\nline-height: 70px;\r\npadding: 0 10px;\r\nfont-size: 23px;\r\ncolor: #ffffff;\r\nmargin: 0;\r\nz-index: 10;\r\n}\r\n\r\n.app-name-mobile{\r\n  position: relative;\r\n  top:-2px;\r\n  font-weight:300;\r\n}\r\n\r\n.app-name-mobile {\r\ndisplay: none;\r\nposition: relative;\r\nwidth: 100%;\r\nline-height: 72px;\r\npadding: 0 10px;\r\nfont-size: 30px;\r\ncolor: #ffffff;\r\nmargin: 0;\r\nz-index: 10;\r\n\r\n}\r\n\r\n\r\n/*\r\n  ===========================\r\n  ===========================\r\n       Map\r\n  ===========================\r\n  ===========================\r\n*/\r\nhtml, body, #mapDiv {\r\npadding: 0; \r\nmargin: 0;\r\nheight: 100%;\r\nfont-family: 'Lato', sans-serif;\r\n}\r\n\r\nbody {\r\npadding-top: 72px;\r\npadding-left:470px;\r\n}\r\n\r\n.leaflet-popup-content-wrapper {\r\n  border-radius: 0px;\r\n}\r\n\r\n.openGraphingModule:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n/*\r\n  ===========================\r\n  ===========================\r\n       Top menu\r\n  ===========================\r\n  ===========================\r\n*/\r\n\r\n#top-menu {\r\nposition: fixed;\r\ntop: 0;\r\nleft: 0;\r\nright: 0;\r\nbackground-color: #1d1d2b;\r\nz-index: 9;\r\n}\r\n\r\n#top-menu > div:not(.logo) {\r\nfloat: left;\r\n}\r\n\r\n#mobile-main-menu {\r\ndisplay: none;\r\ncursor: pointer;\r\n}\r\n\r\n#mobile-main-menu {\r\npadding: 24px 15px;\r\ncolor:white;\r\n}\r\n\r\n/************* END TOP MENU **************/\r\n\r\n\r\n\r\n/*\r\n  ===========================\r\n  ===========================\r\n       Main Menu\r\n  ===========================\r\n  ===========================\r\n*/\r\n\r\n#explanationPanel .card-body {\r\n  padding:0px;\r\n}\r\n\r\n.table .table {\r\n  background-color: #fff;\r\n}\r\n\r\n#paramSelector > span {\r\n  margin-bottom:6px;\r\n}\r\n\r\nselect {\r\n  width:100%;\r\n}\r\n\r\n.datepicker {\r\n  border: solid #999 1px;\r\n}    \r\n\r\n#optionsPanel button {\r\n  margin-bottom:5px;\r\n  width: 100%;\r\n}\r\n\r\n#optionsPanel .card {\r\n  background-color: #ECEEF3;\r\n}\r\n\r\n.select2-selection__choice {\r\n  font-size:12px;\r\n}\r\n\r\n.select2-search__field {\r\n  width: auto !important; \r\n}\r\n\r\n.select2-selection__choice {\r\n  font-size:12px;\r\n}\r\n\r\n#legend .table-expander {\r\n  cursor: pointer;\r\n}\r\n\r\n.table-sm{\r\n  font-size: 14px;\r\n}\r\n\r\n#legend .siteData {\r\n  cursor: pointer;\r\n}\r\n\r\n#legend .wmm-size-25.wmm-pin {\r\n  margin-top: 0px !important;\r\n}\r\n\r\n#layersPanel .card {\r\n  background-color: #ECEEF3;\r\n}\r\n\r\n#legend .card-text {\r\n  height: 40px;\r\n}\r\n\r\n.identification {\r\nfont-size: 14px;\r\nletter-spacing: 1.1px;\r\nbox-sizing: border-box;\r\npadding: 10px;\r\ndisplay: block;\r\ntext-align: center;\r\nopacity: .5;\r\n}\r\n\r\n#main-menu {\r\n  width: 470px;\r\n  height: calc(100% - 72px);\r\n  float: left;\r\n  /* background-color: #20202f; */\r\n  /* margin-top: 65px; */\r\n  position: fixed;\r\n  bottom: 0;\r\n  left: 0;\r\n  transition: left .5s ease;\r\n  background-color: #ECEEF3;\r\n  min-height: 0 !important;\r\n  z-index:1001;\r\n}\r\n\r\n.menu-content{\r\n\theight:100%\r\n}\r\n.menu-content .scrollable-content{\r\n\tdisplay: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n  height: 100%;\r\n}\r\n\r\n#main-menu .main-menu-container {\r\n  position: relative;\r\n  overflow-y: auto;\r\n  height: 100%;\r\n}\r\n\r\n#main-menu-footer {\r\n\tposition: unset;\r\n  height: auto;\r\n  overflow-y: auto;\r\n\tbox-sizing:border-box;\r\n\tpadding: 0 0 10px 0;\r\n}\r\n\r\n#main-menu .sidebar-panel {\r\nbackground-color: #ECEEF3;\r\nmargin: 0 auto;\r\nborder: none;\r\n}\r\n\r\n.card-header > svg {\r\n  float: right;\r\n}\r\n\r\n.card-header:after {\r\n  font-family: 'Font Awesome 5 Free';   \r\n  content: '\\F068';\r\n  font-weight: 900;\r\n  display:none;\r\n}\r\n.card-header.collapsed:after {\r\n  font-family: \"Font Awesome 5 Free\";\r\n  content: \"\\F067\"; \r\n  font-weight: 900;\r\n  display:none;\r\n}\r\n  \r\n#main-menu .sidebar-panel .card-title {\r\nfont-size: 10pt;\r\ntext-transform: uppercase;\r\nfont-weight: 700;\r\nletter-spacing: 1px;\r\n/* text-align: right; */\r\n}\r\n#main-menu .sidebar-panel .card-header {\r\nbox-sizing: border-box;\r\ndisplay: block;\r\nwidth: 100%;\r\npadding: 15px;\r\ncolor: #6F758E;\r\nbackground-color: #ECEEF3;\r\n}\r\n#main-menu .sidebar-panel .card-header:hover {\r\ncursor: pointer;\r\nbackground-color: rgba(255, 255, 255, 0.5);\r\ncolor: #000;\r\n}\r\n\r\n#main-menu .slick-btn {\r\nborder: none;\r\noutline: none;\r\nborder-radius: 0;\r\nfont-size: 9pt;\r\ntext-transform: uppercase;\r\nletter-spacing: 1px;\r\nbox-sizing: border-box;\r\npadding: 5px;\r\ndisplay: block;\r\nwidth: 100%;\r\ntext-align: left;\r\ncolor: #6F758E;\r\nmargin: 0 auto;\r\nborder-left: 4px solid transparent;\r\n}\r\n#main-menu .slick-btn img {\r\nheight: 25px;\r\nvertical-align: middle;\r\ndisplay: inline-block;\r\nmargin: 0 15px 0 0;\r\nborder-radius: 0;\r\nborder: none;\r\n}\r\n#main-menu .slick-btn br {\r\ndisplay: none;\r\n}\r\n#main-menu .slick-btn:hover {\r\nborder-color: #333;\r\nbackground-color: rgba(236, 238, 243, 0.5);\r\n}\r\n#main-menu .slick-btn:focus {\r\nbackground-color: #ECEEF3;\r\nborder-color: #4574CC;\r\n}\r\n\r\n#main-menu .slick-btn-selection {\r\nbackground-color: rgba(117, 136, 184, 0.5);\r\nborder-color: #4574CC !important;\r\n}\r\n\r\n.footer-links {\r\n  font-weight: 300;\r\n  letter-spacing: 1.5px;\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  display: block;\r\n  text-align: center;\r\n  opacity: .5;\r\n  padding:3px;\r\n}\r\n\r\n.footer-links a {\r\n  display: inline-block;\r\n  box-sizing: border-box;\r\n  padding: 0 4px;\r\n  font-size: 8pt;  \r\n}\r\n\r\n.footer-icons {\r\n  padding: 10px;\r\n  letter-spacing: 6px;\r\n  text-align: center;\r\n  opacity: .5;\r\n}\r\n\r\n/************* END MAIN MENU **************/\r\n\r\n/************** Mobile friendly stuff *********/\r\n\r\n@media (max-width: 767px) {\r\n  #mobile-main-menu {\r\n    display: inline-block;\r\n  }\r\n\r\n  .isOpenMenu #main-menu {\r\n    left: 0;\r\n  }\r\n\r\n  .top-menu-brand {\r\n    display:none;\r\n  }\r\n\r\n  body {\r\n    padding-left:0px;\r\n  }\r\n\r\n  #main-menu {\r\n    left: -100%;\r\n    height: calc(100% - 72px);\r\n    width: 100%;\r\n  }\r\n\r\n  .app-name {\r\n    display: none;\r\n  }\r\n\r\n  .app-name-mobile {\r\n    display: inline;\r\n    font-size:medium;\r\n  }\r\n\r\n}",""])},57:function(e,n,r){var t={"./en-SG":10,"./en-SG.js":10,"./en-au":11,"./en-au.js":11,"./en-ca":12,"./en-ca.js":12,"./en-gb":13,"./en-gb.js":13,"./en-ie":14,"./en-ie.js":14,"./en-il":15,"./en-il.js":15,"./en-nz":16,"./en-nz.js":16};function a(e){var n=o(e);return r(n)}function o(e){if(!r.o(t,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t[e]}a.keys=function(){return Object.keys(t)},a.resolve=o,e.exports=a,a.id=57}});