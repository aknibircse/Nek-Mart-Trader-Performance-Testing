/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 20.0, "series": [{"data": [[2100.0, 1.0], [2300.0, 1.0], [2400.0, 4.0], [2600.0, 1.0], [2900.0, 2.0], [900.0, 1.0], [3900.0, 1.0], [4800.0, 1.0], [5500.0, 1.0], [5800.0, 1.0], [1600.0, 2.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa18a4e3c518a7d8bfd3ff0213defded3", "isController": false}, {"data": [[2100.0, 1.0], [1300.0, 1.0], [2700.0, 1.0], [1400.0, 1.0], [2800.0, 1.0], [1500.0, 2.0], [1600.0, 2.0], [1700.0, 3.0], [1800.0, 5.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X28a1b342cb7dc4e5fb56fe89581f94c2", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 1.0], [1200.0, 3.0], [9500.0, 1.0], [1300.0, 4.0], [1400.0, 3.0], [1500.0, 2.0], [1600.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/search-upc-ean", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [2500.0, 2.0], [2600.0, 2.0], [2800.0, 3.0], [2700.0, 3.0], [2900.0, 3.0], [3000.0, 2.0], [3100.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [1100.0, 2.0], [1200.0, 4.0], [1300.0, 4.0], [1400.0, 4.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws", "isController": false}, {"data": [[600.0, 1.0], [2400.0, 1.0], [2600.0, 1.0], [700.0, 1.0], [900.0, 3.0], [1000.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 2.0], [1600.0, 2.0], [1700.0, 1.0], [6700.0, 1.0], [1800.0, 1.0], [1900.0, 3.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe67b2457347cff138c7b12e7f5369f8a", "isController": false}, {"data": [[200.0, 20.0]], "isOverall": false, "label": "https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[2100.0, 3.0], [2200.0, 1.0], [2300.0, 2.0], [2500.0, 1.0], [2700.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [1800.0, 2.0], [1900.0, 3.0], [2000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X60b612f92086e03bc191fde0e6a00266", "isController": false}, {"data": [[2100.0, 2.0], [2300.0, 1.0], [600.0, 1.0], [2500.0, 1.0], [700.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [1200.0, 3.0], [1300.0, 1.0], [1500.0, 3.0], [1600.0, 1.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X47c8890056c1467cbc03751ceb378378", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [300.0, 4.0], [1300.0, 1.0], [700.0, 1.0], [800.0, 1.0], [200.0, 9.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://m.stripe.network/inner.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 1.0], [1500.0, 6.0], [1600.0, 3.0], [1700.0, 2.0], [900.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-1", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 4.0], [1300.0, 3.0], [700.0, 2.0], [1400.0, 3.0], [1500.0, 2.0], [800.0, 1.0], [900.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-0", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 2.0], [1200.0, 1.0], [1400.0, 2.0], [700.0, 3.0], [2900.0, 1.0], [1500.0, 1.0], [800.0, 2.0], [900.0, 3.0], [1000.0, 3.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd", "isController": false}, {"data": [[2700.0, 1.0], [2800.0, 2.0], [3000.0, 1.0], [3200.0, 1.0], [3300.0, 3.0], [3400.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [4400.0, 1.0], [1200.0, 1.0], [5000.0, 1.0], [6300.0, 1.0], [1600.0, 1.0], [6500.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcd4571b45faefa8e323c24997aa30edb", "isController": false}, {"data": [[2600.0, 2.0], [2700.0, 3.0], [2800.0, 7.0], [2900.0, 2.0], [3000.0, 3.0], [3100.0, 3.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create", "isController": false}, {"data": [[103400.0, 1.0], [103500.0, 1.0], [106800.0, 1.0], [107700.0, 1.0], [107800.0, 2.0], [108200.0, 1.0], [108600.0, 1.0], [109500.0, 2.0], [111100.0, 1.0], [111700.0, 1.0], [111600.0, 2.0], [112100.0, 2.0], [113500.0, 2.0], [116100.0, 1.0], [116300.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1300.0, 3.0], [1400.0, 4.0], [1500.0, 2.0], [1600.0, 8.0], [1700.0, 2.0], [1800.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-1", "isController": false}, {"data": [[2100.0, 2.0], [2600.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [900.0, 1.0], [3800.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [1400.0, 1.0], [1500.0, 2.0], [1600.0, 2.0], [1700.0, 2.0], [1800.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xb35ca318e338765b4ec6d9c0be510006", "isController": false}, {"data": [[2100.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [3000.0, 1.0], [3300.0, 2.0], [3500.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [4000.0, 1.0], [4200.0, 1.0], [4400.0, 1.0], [1300.0, 1.0], [5500.0, 1.0], [6300.0, 1.0], [1600.0, 1.0], [1800.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xccaa432d29dc4b28ffa069c9cb4bc8d9", "isController": false}, {"data": [[1200.0, 6.0], [1300.0, 6.0], [1400.0, 3.0], [1500.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-0", "isController": false}, {"data": [[1100.0, 3.0], [600.0, 3.0], [1200.0, 3.0], [1300.0, 3.0], [1400.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [900.0, 3.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/5", "isController": false}, {"data": [[2100.0, 3.0], [2300.0, 2.0], [2500.0, 3.0], [1300.0, 1.0], [2700.0, 1.0], [3300.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 2.0], [900.0, 2.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe7eac5579d97e096a83d80a74458c79a", "isController": false}, {"data": [[1200.0, 3.0], [1300.0, 1.0], [700.0, 1.0], [1400.0, 2.0], [1500.0, 2.0], [400.0, 3.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-1", "isController": false}, {"data": [[1100.0, 6.0], [300.0, 4.0], [600.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [900.0, 3.0], [500.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-0", "isController": false}, {"data": [[5000.0, 1.0], [2800.0, 4.0], [2900.0, 4.0], [3000.0, 4.0], [3100.0, 3.0], [3200.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [1300.0, 3.0], [700.0, 1.0], [1400.0, 3.0], [1500.0, 2.0], [1600.0, 3.0], [900.0, 1.0], [1900.0, 1.0], [500.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-1", "isController": false}, {"data": [[300.0, 2.0], [200.0, 17.0], [500.0, 1.0]], "isOverall": false, "label": "https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1100.0, 7.0], [600.0, 1.0], [1200.0, 2.0], [1400.0, 3.0], [1500.0, 1.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-0", "isController": false}, {"data": [[0.0, 3.0], [1200.0, 1.0], [300.0, 1.0], [600.0, 1.0], [2500.0, 1.0], [1300.0, 1.0], [700.0, 4.0], [800.0, 1.0], [400.0, 2.0], [1800.0, 1.0], [500.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21", "isController": false}, {"data": [[1100.0, 5.0], [1200.0, 1.0], [2400.0, 1.0], [600.0, 2.0], [700.0, 2.0], [1500.0, 1.0], [800.0, 1.0], [400.0, 1.0], [900.0, 1.0], [500.0, 3.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X26232bb4a8d7e7ac19e99dac6eb1aee9", "isController": false}, {"data": [[2400.0, 2.0], [1400.0, 3.0], [2800.0, 1.0], [2700.0, 1.0], [1500.0, 3.0], [3100.0, 1.0], [800.0, 1.0], [1700.0, 4.0], [1800.0, 1.0], [1900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe613b4511b5d812d3628addd31e00557", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [2400.0, 4.0], [2700.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [1100.0, 1.0], [4400.0, 1.0], [1600.0, 2.0], [1700.0, 3.0], [1900.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xac0cf3ead19941cc50f35f990e2ac5fc", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 4.0], [1400.0, 5.0], [1500.0, 6.0], [1600.0, 3.0], [1700.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-1", "isController": false}, {"data": [[1200.0, 3.0], [1300.0, 6.0], [1400.0, 9.0], [1500.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-0", "isController": false}, {"data": [[1600.0, 1.0], [1700.0, 2.0], [1800.0, 10.0], [1900.0, 4.0], [2000.0, 3.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcb3fe6472c610198d5391df44f9857bf", "isController": false}, {"data": [[300.0, 1.0], [200.0, 17.0], [500.0, 2.0]], "isOverall": false, "label": "https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0], [800.0, 1.0], [900.0, 2.0], [1300.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [2900.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3500.0, 2.0], [3800.0, 1.0], [3900.0, 3.0], [4400.0, 2.0], [4800.0, 1.0], [4700.0, 1.0], [300.0, 2.0], [5100.0, 1.0], [5500.0, 1.0], [5600.0, 1.0], [6300.0, 1.0], [6400.0, 1.0], [400.0, 3.0], [6800.0, 2.0], [500.0, 6.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/login", "isController": false}, {"data": [[1100.0, 4.0], [300.0, 4.0], [600.0, 2.0], [1200.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [1600.0, 1.0], [400.0, 1.0], [1000.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-0", "isController": false}, {"data": [[1100.0, 3.0], [2200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1600.0, 2.0], [3200.0, 1.0], [3400.0, 1.0], [1700.0, 1.0], [1900.0, 2.0], [1000.0, 5.0], [2000.0, 2.0]], "isOverall": false, "label": "https://api.getaddress.io/autocomplete/e1?api-key=2LTo74BLRU-4maSsYxkcPw36687&all=true", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [400.0, 2.0], [800.0, 5.0], [900.0, 1.0], [500.0, 3.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-1", "isController": false}, {"data": [[2600.0, 1.0], [2800.0, 5.0], [2700.0, 4.0], [2900.0, 2.0], [3000.0, 3.0], [3100.0, 2.0], [3200.0, 2.0], [3400.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [1500.0, 1.0], [1600.0, 3.0], [3300.0, 1.0], [6500.0, 1.0], [1700.0, 4.0], [1800.0, 2.0], [1900.0, 3.0], [3800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xfcfb91ea8dff40d07b20e3970587b553", "isController": false}, {"data": [[1100.0, 3.0], [600.0, 2.0], [700.0, 4.0], [800.0, 4.0], [900.0, 1.0], [2000.0, 1.0], [500.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/preview", "isController": false}, {"data": [[2200.0, 1.0], [1100.0, 3.0], [1200.0, 2.0], [1300.0, 2.0], [700.0, 1.0], [1400.0, 4.0], [1500.0, 1.0], [1700.0, 3.0], [2000.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4d97084aca930a488b8557470ba1e079", "isController": false}, {"data": [[2100.0, 2.0], [2200.0, 3.0], [2300.0, 2.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1100.0, 1.0], [1300.0, 1.0], [1600.0, 2.0], [1700.0, 2.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [1100.0, 1.0], [2500.0, 1.0], [1300.0, 1.0], [1400.0, 2.0], [1600.0, 1.0], [1700.0, 4.0], [1800.0, 3.0], [1900.0, 1.0], [2000.0, 3.0], [4000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X353cbd5969cc9e4a4f0b3b942d96c52a", "isController": false}, {"data": [[2300.0, 2.0], [2400.0, 1.0], [600.0, 4.0], [2500.0, 2.0], [2800.0, 1.0], [2700.0, 1.0], [2900.0, 2.0], [3000.0, 4.0], [3100.0, 1.0], [3200.0, 1.0], [800.0, 2.0], [3400.0, 1.0], [900.0, 1.0], [1000.0, 3.0], [1100.0, 2.0], [1200.0, 1.0], [1300.0, 4.0], [1500.0, 1.0], [1900.0, 1.0], [2000.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products", "isController": false}, {"data": [[1100.0, 3.0], [1200.0, 4.0], [1300.0, 3.0], [1400.0, 5.0], [800.0, 2.0], [1600.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-0", "isController": false}, {"data": [[2300.0, 1.0], [2200.0, 1.0], [2500.0, 1.0], [3000.0, 2.0], [3200.0, 1.0], [800.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [1300.0, 1.0], [1500.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 4.0], [1900.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X030d7aeca4ca281380005a0d5ed22cea", "isController": false}, {"data": [[1300.0, 5.0], [1400.0, 9.0], [1500.0, 1.0], [1600.0, 4.0], [1700.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-1", "isController": false}, {"data": [[1500.0, 1.0], [1600.0, 1.0], [1700.0, 3.0], [1800.0, 5.0], [1900.0, 5.0], [2000.0, 5.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa88d9c4291eacb6470fd08dcb56d0ffb", "isController": false}, {"data": [[200.0, 20.0]], "isOverall": false, "label": "https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [1300.0, 1.0], [1400.0, 3.0], [1600.0, 3.0], [1700.0, 5.0], [1800.0, 1.0], [1900.0, 3.0], [2000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4a96f6c9e4d86743bdc24dc4079fa791", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [700.0, 3.0], [800.0, 2.0], [900.0, 2.0], [1000.0, 5.0], [500.0, 3.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe9b383d681fc39eac7ea46b9605aebc8", "isController": false}, {"data": [[2300.0, 1.0], [2200.0, 1.0], [2500.0, 1.0], [2800.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3700.0, 2.0], [4000.0, 1.0], [4300.0, 1.0], [1200.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 3.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xaf7c98776b900bf43aaca916dfa803ae", "isController": false}, {"data": [[1100.0, 5.0], [1200.0, 3.0], [600.0, 5.0], [700.0, 5.0], [800.0, 4.0], [400.0, 1.0], [1700.0, 1.0], [900.0, 7.0], [1000.0, 5.0], [500.0, 4.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/register", "isController": false}, {"data": [[1100.0, 3.0], [1300.0, 5.0], [1400.0, 1.0], [700.0, 1.0], [2900.0, 1.0], [1500.0, 4.0], [800.0, 2.0], [900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X1a33f440d9f0b969524def540ab37ed8", "isController": false}, {"data": [[1200.0, 3.0], [1300.0, 2.0], [700.0, 1.0], [1400.0, 2.0], [1500.0, 8.0], [800.0, 1.0], [900.0, 1.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-0", "isController": false}, {"data": [[1200.0, 2.0], [1300.0, 3.0], [1400.0, 3.0], [1500.0, 2.0], [1600.0, 2.0], [1700.0, 2.0], [1800.0, 3.0], [1000.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-1", "isController": false}, {"data": [[2500.0, 1.0], [2600.0, 1.0], [700.0, 1.0], [2800.0, 1.0], [800.0, 1.0], [900.0, 1.0], [1000.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [400.0, 6.0], [1600.0, 1.0], [1700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://cdn.tiny.cloud/1/7mdbxe7dmuli7pf7rc6rxh1qz3gvqgnorfos1jahj2on24k0/tinymce/5.10.9-138/cdn-init", "isController": false}, {"data": [[600.0, 2.0], [1300.0, 2.0], [1400.0, 9.0], [700.0, 1.0], [800.0, 1.0], [1600.0, 2.0], [500.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-0", "isController": false}, {"data": [[2100.0, 3.0], [2300.0, 1.0], [1300.0, 1.0], [2900.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [900.0, 1.0], [1800.0, 4.0], [1900.0, 4.0], [1000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xd4aa084337bc556473c866c4b03f2fcd", "isController": false}, {"data": [[1100.0, 1.0], [4400.0, 1.0], [300.0, 1.0], [1300.0, 1.0], [700.0, 4.0], [400.0, 1.0], [800.0, 4.0], [900.0, 1.0], [1800.0, 1.0], [1000.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2", "isController": false}, {"data": [[2100.0, 2.0], [1400.0, 1.0], [1500.0, 4.0], [800.0, 1.0], [1600.0, 2.0], [1700.0, 2.0], [1800.0, 4.0], [1900.0, 2.0], [1000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-1", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 2.0], [2200.0, 1.0], [600.0, 4.0], [2500.0, 2.0], [2600.0, 1.0], [700.0, 3.0], [800.0, 7.0], [900.0, 4.0], [1000.0, 3.0], [1100.0, 2.0], [1200.0, 1.0], [1400.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [1800.0, 2.0], [1900.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings", "isController": false}, {"data": [[2100.0, 1.0], [1700.0, 4.0], [1800.0, 6.0], [1900.0, 5.0], [2000.0, 4.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xec27d204ab1aee65a0c15f34e24633ec", "isController": false}, {"data": [[0.0, 6.0], [1100.0, 1.0], [1200.0, 4.0], [300.0, 1.0], [5100.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [800.0, 2.0], [900.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1", "isController": false}, {"data": [[2100.0, 2.0], [2300.0, 1.0], [2500.0, 2.0], [2600.0, 3.0], [2700.0, 4.0], [2900.0, 1.0], [3100.0, 2.0], [1600.0, 1.0], [1700.0, 2.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing", "isController": false}, {"data": [[2100.0, 5.0], [2200.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3900.0, 1.0], [1100.0, 1.0], [4800.0, 1.0], [1200.0, 1.0], [5900.0, 1.0], [1600.0, 1.0], [6600.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X71c79941d75b6dc184ea845d638ea15e", "isController": false}, {"data": [[2100.0, 2.0], [0.0, 1.0], [2300.0, 2.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [3200.0, 1.0], [4800.0, 1.0], [1400.0, 1.0], [1600.0, 2.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263", "isController": false}, {"data": [[300.0, 8.0], [700.0, 1.0], [400.0, 7.0], [200.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[2500.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3100.0, 1.0], [3200.0, 2.0], [3700.0, 1.0], [3600.0, 2.0], [4500.0, 1.0], [4400.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X9a55d95f159d9ff09566692331988f99", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [2800.0, 2.0], [1400.0, 5.0], [1500.0, 5.0], [1600.0, 1.0], [1700.0, 3.0], [1900.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xca8af9be2a4b440d3541fe46f99bed9b", "isController": false}, {"data": [[1400.0, 2.0], [1500.0, 10.0], [1600.0, 1.0], [1700.0, 3.0], [1800.0, 1.0], [3600.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-1", "isController": false}, {"data": [[0.0, 2.0], [1100.0, 1.0], [600.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [700.0, 6.0], [800.0, 1.0], [900.0, 3.0], [1900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-existing", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 8.0], [1300.0, 4.0], [1400.0, 3.0], [1500.0, 3.0]], "isOverall": false, "label": "https://m.stripe.com/6", "isController": false}, {"data": [[1200.0, 2.0], [1300.0, 7.0], [1400.0, 5.0], [1500.0, 4.0], [1600.0, 2.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-0", "isController": false}, {"data": [[2200.0, 2.0], [600.0, 1.0], [2500.0, 1.0], [2600.0, 2.0], [2700.0, 2.0], [2800.0, 1.0], [2900.0, 3.0], [3000.0, 3.0], [3100.0, 3.0], [3300.0, 1.0], [3200.0, 1.0], [800.0, 3.0], [3700.0, 1.0], [1100.0, 1.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 5.0], [1500.0, 4.0], [1600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts", "isController": false}, {"data": [[2200.0, 2.0], [2400.0, 1.0], [2500.0, 3.0], [2600.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [2900.0, 2.0], [3000.0, 3.0], [3100.0, 2.0], [3300.0, 2.0], [3200.0, 1.0], [3400.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create", "isController": false}, {"data": [[600.0, 1.0], [1200.0, 2.0], [300.0, 2.0], [700.0, 6.0], [800.0, 4.0], [400.0, 1.0], [900.0, 2.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/logout", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 116300.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 51.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 773.0, "series": [{"data": [[0.0, 51.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 493.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 773.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 363.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.8799999999999994, "minX": 1.7076423E12, "maxY": 20.0, "series": [{"data": [[1.70764236E12, 18.976614699331847], [1.7076423E12, 20.0], [1.70764242E12, 2.8799999999999994]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70764242E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 221.0, "minX": 1.0, "maxY": 116384.0, "series": [{"data": [[20.0, 2720.35]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa18a4e3c518a7d8bfd3ff0213defded3", "isController": false}, {"data": [[20.0, 2720.35]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa18a4e3c518a7d8bfd3ff0213defded3-Aggregated", "isController": false}, {"data": [[20.0, 1864.3]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X28a1b342cb7dc4e5fb56fe89581f94c2", "isController": false}, {"data": [[20.0, 1864.3]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X28a1b342cb7dc4e5fb56fe89581f94c2-Aggregated", "isController": false}, {"data": [[20.0, 1646.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/search-upc-ean", "isController": false}, {"data": [[20.0, 1646.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/search-upc-ean-Aggregated", "isController": false}, {"data": [[20.0, 2026.2500000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws", "isController": false}, {"data": [[20.0, 2026.2500000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-Aggregated", "isController": false}, {"data": [[20.0, 1794.2999999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe67b2457347cff138c7b12e7f5369f8a", "isController": false}, {"data": [[20.0, 1794.2999999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe67b2457347cff138c7b12e7f5369f8a-Aggregated", "isController": false}, {"data": [[8.0, 231.0], [2.0, 234.0], [18.0, 239.16666666666669], [9.0, 244.0], [20.0, 242.33333333333334], [10.0, 241.8], [11.0, 221.0], [15.0, 221.0]], "isOverall": false, "label": "https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[13.25, 237.80000000000004]], "isOverall": false, "label": "https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687-Aggregated", "isController": false}, {"data": [[20.0, 2088.8]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X60b612f92086e03bc191fde0e6a00266", "isController": false}, {"data": [[20.0, 2088.8]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X60b612f92086e03bc191fde0e6a00266-Aggregated", "isController": false}, {"data": [[20.0, 1533.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X47c8890056c1467cbc03751ceb378378", "isController": false}, {"data": [[20.0, 1533.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X47c8890056c1467cbc03751ceb378378-Aggregated", "isController": false}, {"data": [[20.0, 560.6499999999999]], "isOverall": false, "label": "https://m.stripe.network/inner.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[20.0, 560.6499999999999]], "isOverall": false, "label": "https://m.stripe.network/inner.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false-Aggregated", "isController": false}, {"data": [[20.0, 1480.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-1", "isController": false}, {"data": [[20.0, 1480.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-1-Aggregated", "isController": false}, {"data": [[20.0, 1200.3500000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-0", "isController": false}, {"data": [[20.0, 1200.3500000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-0-Aggregated", "isController": false}, {"data": [[18.0, 750.0], [20.0, 1077.333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd", "isController": false}, {"data": [[19.8, 1044.5999999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd-Aggregated", "isController": false}, {"data": [[20.0, 3327.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcd4571b45faefa8e323c24997aa30edb", "isController": false}, {"data": [[20.0, 3327.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcd4571b45faefa8e323c24997aa30edb-Aggregated", "isController": false}, {"data": [[20.0, 2899.7499999999995]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create", "isController": false}, {"data": [[20.0, 2899.7499999999995]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-Aggregated", "isController": false}, {"data": [[8.0, 111689.0], [2.0, 116123.0], [9.0, 111793.0], [10.0, 111165.0], [11.0, 109503.0], [12.0, 109540.0], [3.0, 113504.0], [13.0, 108606.0], [14.0, 108270.0], [15.0, 107808.0], [16.0, 107823.0], [4.0, 113579.0], [1.0, 116384.0], [17.0, 107752.0], [18.0, 106889.0], [19.0, 103599.0], [20.0, 103470.0], [5.0, 112181.0], [6.0, 112168.0], [7.0, 111688.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[10.5, 110176.7]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[20.0, 1580.1999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-1", "isController": false}, {"data": [[20.0, 1580.1999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-1-Aggregated", "isController": false}, {"data": [[20.0, 1924.2000000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xb35ca318e338765b4ec6d9c0be510006", "isController": false}, {"data": [[20.0, 1924.2000000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xb35ca318e338765b4ec6d9c0be510006-Aggregated", "isController": false}, {"data": [[18.0, 3065.5], [20.0, 3229.277777777778]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xccaa432d29dc4b28ffa069c9cb4bc8d9", "isController": false}, {"data": [[19.8, 3212.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xccaa432d29dc4b28ffa069c9cb4bc8d9-Aggregated", "isController": false}, {"data": [[20.0, 1377.3]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-0", "isController": false}, {"data": [[20.0, 1377.3]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-0-Aggregated", "isController": false}, {"data": [[20.0, 1105.2500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/5", "isController": false}, {"data": [[20.0, 1105.2500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/5-Aggregated", "isController": false}, {"data": [[20.0, 2039.3500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe7eac5579d97e096a83d80a74458c79a", "isController": false}, {"data": [[20.0, 2039.3500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe7eac5579d97e096a83d80a74458c79a-Aggregated", "isController": false}, {"data": [[20.0, 1021.4]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-1", "isController": false}, {"data": [[20.0, 1021.4]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-1-Aggregated", "isController": false}, {"data": [[20.0, 899.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-0", "isController": false}, {"data": [[20.0, 899.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-0-Aggregated", "isController": false}, {"data": [[20.0, 3183.4]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create", "isController": false}, {"data": [[20.0, 3183.4]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-Aggregated", "isController": false}, {"data": [[20.0, 1311.0499999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-1", "isController": false}, {"data": [[20.0, 1311.0499999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-1-Aggregated", "isController": false}, {"data": [[18.0, 252.5], [20.0, 269.5]], "isOverall": false, "label": "https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[19.8, 267.8]], "isOverall": false, "label": "https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687-Aggregated", "isController": false}, {"data": [[20.0, 1142.45]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-0", "isController": false}, {"data": [[20.0, 1142.45]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-0-Aggregated", "isController": false}, {"data": [[20.0, 801.9500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21", "isController": false}, {"data": [[20.0, 801.9500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21-Aggregated", "isController": false}, {"data": [[4.0, 483.5], [17.0, 1153.0], [18.0, 1116.6666666666667], [19.0, 872.0], [20.0, 1139.8333333333333], [10.0, 516.0], [11.0, 668.0], [12.0, 963.0], [14.0, 1179.0], [15.0, 1083.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X26232bb4a8d7e7ac19e99dac6eb1aee9", "isController": false}, {"data": [[15.599999999999996, 991.3499999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X26232bb4a8d7e7ac19e99dac6eb1aee9-Aggregated", "isController": false}, {"data": [[20.0, 1809.65]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe613b4511b5d812d3628addd31e00557", "isController": false}, {"data": [[20.0, 1809.65]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe613b4511b5d812d3628addd31e00557-Aggregated", "isController": false}, {"data": [[20.0, 2317.3499999999995]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xac0cf3ead19941cc50f35f990e2ac5fc", "isController": false}, {"data": [[20.0, 2317.3499999999995]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xac0cf3ead19941cc50f35f990e2ac5fc-Aggregated", "isController": false}, {"data": [[20.0, 1499.5500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-1", "isController": false}, {"data": [[20.0, 1499.5500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-1-Aggregated", "isController": false}, {"data": [[20.0, 1399.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-0", "isController": false}, {"data": [[20.0, 1399.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-0-Aggregated", "isController": false}, {"data": [[20.0, 1886.9500000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcb3fe6472c610198d5391df44f9857bf", "isController": false}, {"data": [[20.0, 1886.9500000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcb3fe6472c610198d5391df44f9857bf-Aggregated", "isController": false}, {"data": [[20.0, 275.84999999999997]], "isOverall": false, "label": "https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[20.0, 275.84999999999997]], "isOverall": false, "label": "https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687-Aggregated", "isController": false}, {"data": [[20.0, 2723.1]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/login", "isController": false}, {"data": [[20.0, 2723.1]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/login-Aggregated", "isController": false}, {"data": [[20.0, 859.8999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-0", "isController": false}, {"data": [[20.0, 859.8999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-0-Aggregated", "isController": false}, {"data": [[20.0, 1663.5499999999997]], "isOverall": false, "label": "https://api.getaddress.io/autocomplete/e1?api-key=2LTo74BLRU-4maSsYxkcPw36687&all=true", "isController": false}, {"data": [[20.0, 1663.5499999999997]], "isOverall": false, "label": "https://api.getaddress.io/autocomplete/e1?api-key=2LTo74BLRU-4maSsYxkcPw36687&all=true-Aggregated", "isController": false}, {"data": [[20.0, 928.5999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-1", "isController": false}, {"data": [[20.0, 928.5999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-1-Aggregated", "isController": false}, {"data": [[20.0, 2958.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create", "isController": false}, {"data": [[20.0, 2958.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-Aggregated", "isController": false}, {"data": [[20.0, 2294.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xfcfb91ea8dff40d07b20e3970587b553", "isController": false}, {"data": [[20.0, 2294.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xfcfb91ea8dff40d07b20e3970587b553-Aggregated", "isController": false}, {"data": [[20.0, 876.9500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/preview", "isController": false}, {"data": [[20.0, 876.9500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/preview-Aggregated", "isController": false}, {"data": [[20.0, 1410.2222222222226], [14.0, 1325.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4d97084aca930a488b8557470ba1e079", "isController": false}, {"data": [[19.400000000000002, 1401.7500000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4d97084aca930a488b8557470ba1e079-Aggregated", "isController": false}, {"data": [[20.0, 1921.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create", "isController": false}, {"data": [[20.0, 1921.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-Aggregated", "isController": false}, {"data": [[20.0, 1945.05]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X353cbd5969cc9e4a4f0b3b942d96c52a", "isController": false}, {"data": [[20.0, 1945.05]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X353cbd5969cc9e4a4f0b3b942d96c52a-Aggregated", "isController": false}, {"data": [[20.0, 1840.2250000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products", "isController": false}, {"data": [[20.0, 1840.2250000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-Aggregated", "isController": false}, {"data": [[20.0, 1251.5000000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-0", "isController": false}, {"data": [[20.0, 1251.5000000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-0-Aggregated", "isController": false}, {"data": [[8.0, 1252.0], [17.0, 1285.0], [18.0, 1853.6666666666667], [20.0, 2249.4444444444443], [12.0, 1148.0], [6.0, 1616.0], [14.0, 1528.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X030d7aeca4ca281380005a0d5ed22cea", "isController": false}, {"data": [[17.25, 1909.7999999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X030d7aeca4ca281380005a0d5ed22cea-Aggregated", "isController": false}, {"data": [[20.0, 1474.9000000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-1", "isController": false}, {"data": [[20.0, 1474.9000000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-1-Aggregated", "isController": false}, {"data": [[20.0, 1887.55]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa88d9c4291eacb6470fd08dcb56d0ffb", "isController": false}, {"data": [[20.0, 1887.55]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa88d9c4291eacb6470fd08dcb56d0ffb-Aggregated", "isController": false}, {"data": [[2.0, 247.0], [18.0, 244.5], [9.0, 250.0], [20.0, 243.33333333333334], [10.0, 247.0], [11.0, 252.75], [15.0, 231.0]], "isOverall": false, "label": "https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[13.449999999999996, 246.35000000000002]], "isOverall": false, "label": "https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687-Aggregated", "isController": false}, {"data": [[20.0, 1779.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4a96f6c9e4d86743bdc24dc4079fa791", "isController": false}, {"data": [[20.0, 1779.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4a96f6c9e4d86743bdc24dc4079fa791-Aggregated", "isController": false}, {"data": [[2.0, 535.0], [17.0, 1074.0], [18.0, 1033.0], [9.0, 719.0], [20.0, 1289.0], [10.0, 861.5], [11.0, 801.25], [12.0, 980.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe9b383d681fc39eac7ea46b9605aebc8", "isController": false}, {"data": [[13.700000000000003, 941.7999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe9b383d681fc39eac7ea46b9605aebc8-Aggregated", "isController": false}, {"data": [[18.0, 3551.0], [20.0, 2436.785714285714], [10.0, 1629.0], [11.0, 1935.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xaf7c98776b900bf43aaca916dfa803ae", "isController": false}, {"data": [[18.650000000000002, 2594.15]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xaf7c98776b900bf43aaca916dfa803ae-Aggregated", "isController": false}, {"data": [[2.0, 562.6666666666666], [9.0, 659.0], [10.0, 733.2857142857143], [11.0, 757.0], [12.0, 1173.0], [3.0, 600.0], [13.0, 987.0], [14.0, 1103.0], [4.0, 523.0], [17.0, 1028.5], [18.0, 926.1818181818181], [20.0, 1221.2], [5.0, 528.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/register", "isController": false}, {"data": [[13.275, 901.35]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/register-Aggregated", "isController": false}, {"data": [[8.0, 1329.0], [2.0, 878.0], [9.0, 1162.0], [10.0, 1155.0], [11.0, 1043.0], [12.0, 1390.0], [3.0, 1390.0], [13.0, 1415.0], [14.0, 1544.0], [15.0, 1563.0], [16.0, 1578.0], [4.0, 779.0], [1.0, 862.0], [17.0, 1316.0], [18.0, 2975.0], [19.0, 1360.0], [20.0, 1507.0], [5.0, 902.0], [6.0, 1145.0], [7.0, 1031.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X1a33f440d9f0b969524def540ab37ed8", "isController": false}, {"data": [[10.5, 1316.1999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X1a33f440d9f0b969524def540ab37ed8-Aggregated", "isController": false}, {"data": [[20.0, 1346.0000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-0", "isController": false}, {"data": [[20.0, 1346.0000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-0-Aggregated", "isController": false}, {"data": [[20.0, 1529.8000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-1", "isController": false}, {"data": [[20.0, 1529.8000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-1-Aggregated", "isController": false}, {"data": [[20.0, 1100.2]], "isOverall": false, "label": "https://cdn.tiny.cloud/1/7mdbxe7dmuli7pf7rc6rxh1qz3gvqgnorfos1jahj2on24k0/tinymce/5.10.9-138/cdn-init", "isController": false}, {"data": [[20.0, 1100.2]], "isOverall": false, "label": "https://cdn.tiny.cloud/1/7mdbxe7dmuli7pf7rc6rxh1qz3gvqgnorfos1jahj2on24k0/tinymce/5.10.9-138/cdn-init-Aggregated", "isController": false}, {"data": [[20.0, 1228.7]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-0", "isController": false}, {"data": [[20.0, 1228.7]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-0-Aggregated", "isController": false}, {"data": [[20.0, 1869.45]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xd4aa084337bc556473c866c4b03f2fcd", "isController": false}, {"data": [[20.0, 1869.45]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xd4aa084337bc556473c866c4b03f2fcd-Aggregated", "isController": false}, {"data": [[17.0, 835.0], [18.0, 794.0], [20.0, 1124.888888888889]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2", "isController": false}, {"data": [[19.75, 1093.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2-Aggregated", "isController": false}, {"data": [[20.0, 1691.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-1", "isController": false}, {"data": [[20.0, 1691.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-1-Aggregated", "isController": false}, {"data": [[18.0, 811.1666666666667], [20.0, 1471.0645161290322], [10.0, 723.0], [15.0, 871.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings", "isController": false}, {"data": [[19.075, 1319.675]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-Aggregated", "isController": false}, {"data": [[20.0, 1895.95]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xec27d204ab1aee65a0c15f34e24633ec", "isController": false}, {"data": [[20.0, 1895.95]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xec27d204ab1aee65a0c15f34e24633ec-Aggregated", "isController": false}, {"data": [[20.0, 941.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1", "isController": false}, {"data": [[20.0, 941.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1-Aggregated", "isController": false}, {"data": [[20.0, 2453.8500000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing", "isController": false}, {"data": [[20.0, 2453.8500000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-Aggregated", "isController": false}, {"data": [[20.0, 2896.0499999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X71c79941d75b6dc184ea845d638ea15e", "isController": false}, {"data": [[20.0, 2896.0499999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X71c79941d75b6dc184ea845d638ea15e-Aggregated", "isController": false}, {"data": [[20.0, 2263.6000000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263", "isController": false}, {"data": [[20.0, 2263.6000000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263-Aggregated", "isController": false}, {"data": [[20.0, 434.8]], "isOverall": false, "label": "https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[20.0, 434.8]], "isOverall": false, "label": "https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false-Aggregated", "isController": false}, {"data": [[18.0, 1289.0], [20.0, 2730.2105263157896]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X9a55d95f159d9ff09566692331988f99", "isController": false}, {"data": [[19.9, 2658.15]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X9a55d95f159d9ff09566692331988f99-Aggregated", "isController": false}, {"data": [[20.0, 1656.1999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xca8af9be2a4b440d3541fe46f99bed9b", "isController": false}, {"data": [[20.0, 1656.1999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xca8af9be2a4b440d3541fe46f99bed9b-Aggregated", "isController": false}, {"data": [[20.0, 1743.25]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-1", "isController": false}, {"data": [[20.0, 1743.25]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-1-Aggregated", "isController": false}, {"data": [[20.0, 836.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-existing", "isController": false}, {"data": [[20.0, 836.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-existing-Aggregated", "isController": false}, {"data": [[20.0, 1338.5000000000002]], "isOverall": false, "label": "https://m.stripe.com/6", "isController": false}, {"data": [[20.0, 1338.5000000000002]], "isOverall": false, "label": "https://m.stripe.com/6-Aggregated", "isController": false}, {"data": [[20.0, 1439.7500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-0", "isController": false}, {"data": [[20.0, 1439.7500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-0-Aggregated", "isController": false}, {"data": [[20.0, 2087.975]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts", "isController": false}, {"data": [[20.0, 2087.975]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-Aggregated", "isController": false}, {"data": [[20.0, 2876.2500000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create", "isController": false}, {"data": [[20.0, 2876.2500000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-Aggregated", "isController": false}, {"data": [[4.0, 390.0], [18.0, 805.0], [20.0, 847.5], [5.0, 384.0], [11.0, 790.0], [12.0, 876.0], [14.0, 981.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/logout", "isController": false}, {"data": [[16.6, 791.8]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/logout-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 20.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 461.3833333333333, "minX": 1.7076423E12, "maxY": 697594.1333333333, "series": [{"data": [[1.70764236E12, 697594.1333333333], [1.7076423E12, 470401.1666666667], [1.70764242E12, 12062.15]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.70764236E12, 34192.23333333333], [1.7076423E12, 21606.283333333333], [1.70764242E12, 461.3833333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70764242E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7076423E12, "maxY": 114354.2, "series": [{"data": [[1.70764236E12, 2720.35]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa18a4e3c518a7d8bfd3ff0213defded3", "isController": false}, {"data": [[1.7076423E12, 1864.3]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X28a1b342cb7dc4e5fb56fe89581f94c2", "isController": false}, {"data": [[1.70764236E12, 1646.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/search-upc-ean", "isController": false}, {"data": [[1.7076423E12, 2026.2500000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws", "isController": false}, {"data": [[1.70764236E12, 1794.2999999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe67b2457347cff138c7b12e7f5369f8a", "isController": false}, {"data": [[1.70764236E12, 238.22222222222226], [1.70764242E12, 234.0]], "isOverall": false, "label": "https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.7076423E12, 2088.8]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X60b612f92086e03bc191fde0e6a00266", "isController": false}, {"data": [[1.7076423E12, 1533.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X47c8890056c1467cbc03751ceb378378", "isController": false}, {"data": [[1.7076423E12, 560.6499999999999]], "isOverall": false, "label": "https://m.stripe.network/inner.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[1.7076423E12, 1480.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-1", "isController": false}, {"data": [[1.7076423E12, 1200.3500000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-0", "isController": false}, {"data": [[1.70764236E12, 1044.5999999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd", "isController": false}, {"data": [[1.70764236E12, 3327.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcd4571b45faefa8e323c24997aa30edb", "isController": false}, {"data": [[1.7076423E12, 2899.7499999999995]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create", "isController": false}, {"data": [[1.70764236E12, 108784.2], [1.70764242E12, 114354.2]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.7076423E12, 1580.1999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-1", "isController": false}, {"data": [[1.70764236E12, 1924.2000000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xb35ca318e338765b4ec6d9c0be510006", "isController": false}, {"data": [[1.70764236E12, 3212.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xccaa432d29dc4b28ffa069c9cb4bc8d9", "isController": false}, {"data": [[1.7076423E12, 1377.3]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-0", "isController": false}, {"data": [[1.7076423E12, 1105.2500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/5", "isController": false}, {"data": [[1.70764236E12, 2160.909090909091], [1.7076423E12, 1890.7777777777778]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe7eac5579d97e096a83d80a74458c79a", "isController": false}, {"data": [[1.70764236E12, 1021.4]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-1", "isController": false}, {"data": [[1.70764236E12, 899.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-0", "isController": false}, {"data": [[1.7076423E12, 3183.4]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create", "isController": false}, {"data": [[1.70764236E12, 1311.0499999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-1", "isController": false}, {"data": [[1.70764236E12, 267.8]], "isOverall": false, "label": "https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.70764236E12, 1150.894736842105], [1.7076423E12, 982.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-0", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.7076423E12, 844.1578947368423]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21", "isController": false}, {"data": [[1.70764236E12, 1047.7777777777776], [1.70764242E12, 483.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X26232bb4a8d7e7ac19e99dac6eb1aee9", "isController": false}, {"data": [[1.70764236E12, 1932.8235294117649], [1.7076423E12, 1111.6666666666667]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe613b4511b5d812d3628addd31e00557", "isController": false}, {"data": [[1.70764236E12, 2317.3499999999995]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xac0cf3ead19941cc50f35f990e2ac5fc", "isController": false}, {"data": [[1.7076423E12, 1499.5500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-1", "isController": false}, {"data": [[1.7076423E12, 1399.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-0", "isController": false}, {"data": [[1.7076423E12, 1886.9500000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcb3fe6472c610198d5391df44f9857bf", "isController": false}, {"data": [[1.70764236E12, 275.84999999999997]], "isOverall": false, "label": "https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.7076423E12, 2723.1]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/login", "isController": false}, {"data": [[1.70764236E12, 859.8999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-0", "isController": false}, {"data": [[1.70764236E12, 1663.5499999999997]], "isOverall": false, "label": "https://api.getaddress.io/autocomplete/e1?api-key=2LTo74BLRU-4maSsYxkcPw36687&all=true", "isController": false}, {"data": [[1.70764236E12, 928.5999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-1", "isController": false}, {"data": [[1.7076423E12, 2958.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create", "isController": false}, {"data": [[1.70764236E12, 2294.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xfcfb91ea8dff40d07b20e3970587b553", "isController": false}, {"data": [[1.70764236E12, 876.9500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/preview", "isController": false}, {"data": [[1.70764236E12, 1401.7500000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4d97084aca930a488b8557470ba1e079", "isController": false}, {"data": [[1.70764236E12, 1921.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create", "isController": false}, {"data": [[1.7076423E12, 1945.05]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X353cbd5969cc9e4a4f0b3b942d96c52a", "isController": false}, {"data": [[1.70764236E12, 1114.2307692307693], [1.7076423E12, 2189.777777777778]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products", "isController": false}, {"data": [[1.7076423E12, 1251.5000000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-0", "isController": false}, {"data": [[1.70764236E12, 1909.7999999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X030d7aeca4ca281380005a0d5ed22cea", "isController": false}, {"data": [[1.7076423E12, 1474.9000000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-1", "isController": false}, {"data": [[1.7076423E12, 1887.55]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa88d9c4291eacb6470fd08dcb56d0ffb", "isController": false}, {"data": [[1.70764236E12, 246.2777777777778], [1.70764242E12, 247.0]], "isOverall": false, "label": "https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.7076423E12, 1779.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4a96f6c9e4d86743bdc24dc4079fa791", "isController": false}, {"data": [[1.70764236E12, 986.9999999999999], [1.70764242E12, 535.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe9b383d681fc39eac7ea46b9605aebc8", "isController": false}, {"data": [[1.70764236E12, 2594.15]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xaf7c98776b900bf43aaca916dfa803ae", "isController": false}, {"data": [[1.70764236E12, 949.8], [1.70764242E12, 562.2]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/register", "isController": false}, {"data": [[1.70764236E12, 1434.2], [1.70764242E12, 962.2]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X1a33f440d9f0b969524def540ab37ed8", "isController": false}, {"data": [[1.70764236E12, 1346.0000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-0", "isController": false}, {"data": [[1.70764236E12, 1529.8000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-1", "isController": false}, {"data": [[1.70764236E12, 1054.0], [1.7076423E12, 1102.6315789473686]], "isOverall": false, "label": "https://cdn.tiny.cloud/1/7mdbxe7dmuli7pf7rc6rxh1qz3gvqgnorfos1jahj2on24k0/tinymce/5.10.9-138/cdn-init", "isController": false}, {"data": [[1.7076423E12, 1228.7]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-0", "isController": false}, {"data": [[1.70764236E12, 1869.45]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xd4aa084337bc556473c866c4b03f2fcd", "isController": false}, {"data": [[1.70764236E12, 1093.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2", "isController": false}, {"data": [[1.7076423E12, 1691.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-1", "isController": false}, {"data": [[1.70764236E12, 1319.675]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings", "isController": false}, {"data": [[1.7076423E12, 1895.95]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xec27d204ab1aee65a0c15f34e24633ec", "isController": false}, {"data": [[1.70764236E12, 941.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1", "isController": false}, {"data": [[1.70764236E12, 2453.8500000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing", "isController": false}, {"data": [[1.70764236E12, 5922.0], [1.7076423E12, 2736.7894736842104]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X71c79941d75b6dc184ea845d638ea15e", "isController": false}, {"data": [[1.70764236E12, 2263.6000000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263", "isController": false}, {"data": [[1.7076423E12, 434.8]], "isOverall": false, "label": "https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[1.70764236E12, 2658.15]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X9a55d95f159d9ff09566692331988f99", "isController": false}, {"data": [[1.7076423E12, 1656.1999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xca8af9be2a4b440d3541fe46f99bed9b", "isController": false}, {"data": [[1.7076423E12, 1743.25]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-1", "isController": false}, {"data": [[1.70764236E12, 836.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-existing", "isController": false}, {"data": [[1.7076423E12, 1338.5000000000002]], "isOverall": false, "label": "https://m.stripe.com/6", "isController": false}, {"data": [[1.7076423E12, 1439.7500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-0", "isController": false}, {"data": [[1.7076423E12, 2087.975]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts", "isController": false}, {"data": [[1.70764236E12, 2876.2500000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create", "isController": false}, {"data": [[1.70764236E12, 836.7777777777777], [1.70764242E12, 387.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/logout", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70764242E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7076423E12, "maxY": 70938.6, "series": [{"data": [[1.70764236E12, 926.45]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa18a4e3c518a7d8bfd3ff0213defded3", "isController": false}, {"data": [[1.7076423E12, 1388.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X28a1b342cb7dc4e5fb56fe89581f94c2", "isController": false}, {"data": [[1.70764236E12, 1646.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/search-upc-ean", "isController": false}, {"data": [[1.7076423E12, 1288.6000000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws", "isController": false}, {"data": [[1.70764236E12, 1295.8999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe67b2457347cff138c7b12e7f5369f8a", "isController": false}, {"data": [[1.70764236E12, 238.22222222222226], [1.70764242E12, 234.0]], "isOverall": false, "label": "https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.7076423E12, 1440.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X60b612f92086e03bc191fde0e6a00266", "isController": false}, {"data": [[1.7076423E12, 994.6999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X47c8890056c1467cbc03751ceb378378", "isController": false}, {"data": [[1.7076423E12, 560.5499999999998]], "isOverall": false, "label": "https://m.stripe.network/inner.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[1.7076423E12, 1480.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-1", "isController": false}, {"data": [[1.7076423E12, 1200.3500000000004]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-0", "isController": false}, {"data": [[1.70764236E12, 548.1]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd", "isController": false}, {"data": [[1.70764236E12, 942.7000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcd4571b45faefa8e323c24997aa30edb", "isController": false}, {"data": [[1.7076423E12, 1399.8]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create", "isController": false}, {"data": [[1.70764236E12, 66404.66666666667], [1.70764242E12, 70938.6]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.7076423E12, 1580.0500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-1", "isController": false}, {"data": [[1.70764236E12, 764.4000000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xb35ca318e338765b4ec6d9c0be510006", "isController": false}, {"data": [[1.70764236E12, 834.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xccaa432d29dc4b28ffa069c9cb4bc8d9", "isController": false}, {"data": [[1.7076423E12, 1377.2499999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-0", "isController": false}, {"data": [[1.7076423E12, 1105.2]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/5", "isController": false}, {"data": [[1.70764236E12, 1251.2727272727273], [1.7076423E12, 734.2222222222222]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe7eac5579d97e096a83d80a74458c79a", "isController": false}, {"data": [[1.70764236E12, 1021.4]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-1", "isController": false}, {"data": [[1.70764236E12, 899.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-0", "isController": false}, {"data": [[1.7076423E12, 1439.7000000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create", "isController": false}, {"data": [[1.70764236E12, 1311.0499999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-1", "isController": false}, {"data": [[1.70764236E12, 267.8]], "isOverall": false, "label": "https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.70764236E12, 1150.8421052631581], [1.7076423E12, 982.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-0", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.7076423E12, 839.315789473684]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21", "isController": false}, {"data": [[1.70764236E12, 786.3888888888889], [1.70764242E12, 365.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X26232bb4a8d7e7ac19e99dac6eb1aee9", "isController": false}, {"data": [[1.70764236E12, 1011.2941176470587], [1.7076423E12, 533.3333333333334]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe613b4511b5d812d3628addd31e00557", "isController": false}, {"data": [[1.70764236E12, 994.3999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xac0cf3ead19941cc50f35f990e2ac5fc", "isController": false}, {"data": [[1.7076423E12, 1499.4999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-1", "isController": false}, {"data": [[1.7076423E12, 1399.8]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-0", "isController": false}, {"data": [[1.7076423E12, 1352.45]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcb3fe6472c610198d5391df44f9857bf", "isController": false}, {"data": [[1.70764236E12, 275.8]], "isOverall": false, "label": "https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.7076423E12, 2444.25]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/login", "isController": false}, {"data": [[1.70764236E12, 859.8499999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-0", "isController": false}, {"data": [[1.70764236E12, 1663.5]], "isOverall": false, "label": "https://api.getaddress.io/autocomplete/e1?api-key=2LTo74BLRU-4maSsYxkcPw36687&all=true", "isController": false}, {"data": [[1.70764236E12, 928.5499999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-1", "isController": false}, {"data": [[1.7076423E12, 1377.2499999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create", "isController": false}, {"data": [[1.70764236E12, 1341.8500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xfcfb91ea8dff40d07b20e3970587b553", "isController": false}, {"data": [[1.70764236E12, 876.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/preview", "isController": false}, {"data": [[1.70764236E12, 853.9000000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4d97084aca930a488b8557470ba1e079", "isController": false}, {"data": [[1.70764236E12, 899.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create", "isController": false}, {"data": [[1.7076423E12, 1060.9999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X353cbd5969cc9e4a4f0b3b942d96c52a", "isController": false}, {"data": [[1.70764236E12, 1114.1538461538462], [1.7076423E12, 1092.703703703704]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products", "isController": false}, {"data": [[1.7076423E12, 1251.4499999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-0", "isController": false}, {"data": [[1.70764236E12, 913.0499999999997]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X030d7aeca4ca281380005a0d5ed22cea", "isController": false}, {"data": [[1.7076423E12, 1474.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-1", "isController": false}, {"data": [[1.7076423E12, 1392.3000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa88d9c4291eacb6470fd08dcb56d0ffb", "isController": false}, {"data": [[1.70764236E12, 246.2777777777778], [1.70764242E12, 247.0]], "isOverall": false, "label": "https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.7076423E12, 1208.3500000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4a96f6c9e4d86743bdc24dc4079fa791", "isController": false}, {"data": [[1.70764236E12, 757.4444444444443], [1.70764242E12, 362.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe9b383d681fc39eac7ea46b9605aebc8", "isController": false}, {"data": [[1.70764236E12, 915.3000000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xaf7c98776b900bf43aaca916dfa803ae", "isController": false}, {"data": [[1.70764236E12, 924.3428571428569], [1.70764242E12, 558.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/register", "isController": false}, {"data": [[1.70764236E12, 699.7333333333335], [1.70764242E12, 490.2]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X1a33f440d9f0b969524def540ab37ed8", "isController": false}, {"data": [[1.70764236E12, 1346.0000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-0", "isController": false}, {"data": [[1.70764236E12, 1529.75]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-1", "isController": false}, {"data": [[1.70764236E12, 1054.0], [1.7076423E12, 1102.5789473684213]], "isOverall": false, "label": "https://cdn.tiny.cloud/1/7mdbxe7dmuli7pf7rc6rxh1qz3gvqgnorfos1jahj2on24k0/tinymce/5.10.9-138/cdn-init", "isController": false}, {"data": [[1.7076423E12, 1228.2500000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-0", "isController": false}, {"data": [[1.70764236E12, 1292.4]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xd4aa084337bc556473c866c4b03f2fcd", "isController": false}, {"data": [[1.70764236E12, 1093.85]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2", "isController": false}, {"data": [[1.7076423E12, 1691.7]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-1", "isController": false}, {"data": [[1.70764236E12, 855.25]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings", "isController": false}, {"data": [[1.7076423E12, 1397.95]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xec27d204ab1aee65a0c15f34e24633ec", "isController": false}, {"data": [[1.70764236E12, 938.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1", "isController": false}, {"data": [[1.70764236E12, 1142.4]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing", "isController": false}, {"data": [[1.70764236E12, 906.0], [1.7076423E12, 1185.157894736842]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X71c79941d75b6dc184ea845d638ea15e", "isController": false}, {"data": [[1.70764236E12, 1074.7]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263", "isController": false}, {"data": [[1.7076423E12, 434.75]], "isOverall": false, "label": "https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[1.70764236E12, 965.8]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X9a55d95f159d9ff09566692331988f99", "isController": false}, {"data": [[1.7076423E12, 967.8]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xca8af9be2a4b440d3541fe46f99bed9b", "isController": false}, {"data": [[1.7076423E12, 1743.1499999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-1", "isController": false}, {"data": [[1.70764236E12, 836.6999999999998]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-existing", "isController": false}, {"data": [[1.7076423E12, 1338.4500000000003]], "isOverall": false, "label": "https://m.stripe.com/6", "isController": false}, {"data": [[1.7076423E12, 1439.7000000000003]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-0", "isController": false}, {"data": [[1.7076423E12, 1241.25]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts", "isController": false}, {"data": [[1.70764236E12, 1346.0000000000002]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create", "isController": false}, {"data": [[1.70764236E12, 836.7777777777777], [1.70764242E12, 387.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/logout", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70764242E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.7076423E12, "maxY": 11273.4, "series": [{"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa18a4e3c518a7d8bfd3ff0213defded3", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X28a1b342cb7dc4e5fb56fe89581f94c2", "isController": false}, {"data": [[1.70764236E12, 18.699999999999996]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/search-upc-ean", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws", "isController": false}, {"data": [[1.70764236E12, 419.19999999999993]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe67b2457347cff138c7b12e7f5369f8a", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.70764242E12, 0.0]], "isOverall": false, "label": "https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X60b612f92086e03bc191fde0e6a00266", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X47c8890056c1467cbc03751ceb378378", "isController": false}, {"data": [[1.7076423E12, 305.90000000000003]], "isOverall": false, "label": "https://m.stripe.network/inner.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-1", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-0", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd", "isController": false}, {"data": [[1.70764236E12, 37.74999999999999]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcd4571b45faefa8e323c24997aa30edb", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create", "isController": false}, {"data": [[1.70764236E12, 7201.799999999998], [1.70764242E12, 11273.4]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-1", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xb35ca318e338765b4ec6d9c0be510006", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xccaa432d29dc4b28ffa069c9cb4bc8d9", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-0", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/5", "isController": false}, {"data": [[1.70764236E12, 102.0], [1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe7eac5579d97e096a83d80a74458c79a", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-1", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-0", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-1", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-0", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.70764242E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X26232bb4a8d7e7ac19e99dac6eb1aee9", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe613b4511b5d812d3628addd31e00557", "isController": false}, {"data": [[1.70764236E12, 136.95000000000005]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xac0cf3ead19941cc50f35f990e2ac5fc", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-1", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-0", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcb3fe6472c610198d5391df44f9857bf", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.7076423E12, 1676.775]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/login", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-0", "isController": false}, {"data": [[1.70764236E12, 1347.8500000000001]], "isOverall": false, "label": "https://api.getaddress.io/autocomplete/e1?api-key=2LTo74BLRU-4maSsYxkcPw36687&all=true", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-1", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create", "isController": false}, {"data": [[1.70764236E12, 74.80000000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xfcfb91ea8dff40d07b20e3970587b553", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/preview", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4d97084aca930a488b8557470ba1e079", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X353cbd5969cc9e4a4f0b3b942d96c52a", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-0", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X030d7aeca4ca281380005a0d5ed22cea", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-1", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa88d9c4291eacb6470fd08dcb56d0ffb", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.70764242E12, 0.0]], "isOverall": false, "label": "https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4a96f6c9e4d86743bdc24dc4079fa791", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.70764242E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe9b383d681fc39eac7ea46b9605aebc8", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xaf7c98776b900bf43aaca916dfa803ae", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.70764242E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/register", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.70764242E12, 74.6]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X1a33f440d9f0b969524def540ab37ed8", "isController": false}, {"data": [[1.70764236E12, 56.1]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-0", "isController": false}, {"data": [[1.70764236E12, 74.9]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-1", "isController": false}, {"data": [[1.70764236E12, 538.0], [1.7076423E12, 845.2631578947368]], "isOverall": false, "label": "https://cdn.tiny.cloud/1/7mdbxe7dmuli7pf7rc6rxh1qz3gvqgnorfos1jahj2on24k0/tinymce/5.10.9-138/cdn-init", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-0", "isController": false}, {"data": [[1.70764236E12, 56.150000000000006]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xd4aa084337bc556473c866c4b03f2fcd", "isController": false}, {"data": [[1.70764236E12, 82.50000000000001]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-1", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xec27d204ab1aee65a0c15f34e24633ec", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X71c79941d75b6dc184ea845d638ea15e", "isController": false}, {"data": [[1.70764236E12, 37.5]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263", "isController": false}, {"data": [[1.7076423E12, 366.25]], "isOverall": false, "label": "https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X9a55d95f159d9ff09566692331988f99", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xca8af9be2a4b440d3541fe46f99bed9b", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-1", "isController": false}, {"data": [[1.70764236E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-existing", "isController": false}, {"data": [[1.7076423E12, 1021.85]], "isOverall": false, "label": "https://m.stripe.com/6", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-0", "isController": false}, {"data": [[1.7076423E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts", "isController": false}, {"data": [[1.70764236E12, 56.1]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create", "isController": false}, {"data": [[1.70764236E12, 0.0], [1.70764242E12, 0.0]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/logout", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70764242E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 233.0, "minX": 1.7076423E12, "maxY": 6882.0, "series": [{"data": [[1.70764236E12, 6714.0], [1.7076423E12, 6882.0], [1.70764242E12, 1390.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.70764236E12, 3100.6], [1.7076423E12, 3019.000000000001], [1.70764242E12, 1292.4000000000003]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.70764236E12, 5904.36], [1.7076423E12, 5602.959999999997], [1.70764242E12, 1390.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.70764236E12, 3613.5999999999954], [1.7076423E12, 3351.0], [1.70764242E12, 1390.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.70764236E12, 358.0], [1.7076423E12, 233.0], [1.70764242E12, 435.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.70764236E12, 1612.0], [1.7076423E12, 1676.0], [1.70764242E12, 606.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70764242E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 234.0, "minX": 3.0, "maxY": 3231.0, "series": [{"data": [[8.0, 1692.0], [9.0, 2400.0], [10.0, 1853.5], [11.0, 1512.0], [3.0, 2920.0], [12.0, 1858.5], [13.0, 1577.0], [14.0, 1594.0], [15.0, 1561.5], [16.0, 1548.0], [4.0, 3231.0], [17.0, 1528.0], [18.0, 1674.0], [19.0, 1753.0], [20.0, 1693.0], [5.0, 2374.0], [21.0, 1644.0], [22.0, 1380.5], [23.0, 782.0], [24.0, 1008.0], [6.0, 1022.5], [25.0, 1719.0], [7.0, 1816.0], [31.0, 1200.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 1009.0], [9.0, 727.0], [10.0, 1269.0], [11.0, 897.0], [12.0, 996.5], [3.0, 550.0], [13.0, 697.0], [14.0, 807.0], [15.0, 1093.0], [16.0, 649.5], [4.0, 258.0], [17.0, 1012.0], [18.0, 671.0], [19.0, 821.5], [20.0, 593.0], [5.0, 1046.0], [21.0, 904.0], [22.0, 234.0], [23.0, 250.0], [24.0, 595.0], [6.0, 456.5], [25.0, 673.0], [7.0, 1039.0], [31.0, 534.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 31.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 234.0, "minX": 3.0, "maxY": 2508.0, "series": [{"data": [[8.0, 761.0], [9.0, 1043.5], [10.0, 1219.5], [11.0, 1000.5], [3.0, 2508.0], [12.0, 1116.0], [13.0, 1372.5], [14.0, 1365.0], [15.0, 1137.0], [16.0, 1268.5], [4.0, 1420.0], [17.0, 1183.0], [18.0, 1232.0], [19.0, 1269.0], [20.0, 1110.0], [5.0, 540.0], [21.0, 1413.0], [22.0, 1064.5], [23.0, 628.0], [24.0, 549.0], [6.0, 574.5], [25.0, 893.0], [7.0, 966.5], [31.0, 1199.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 1009.0], [9.0, 727.0], [10.0, 1269.0], [11.0, 897.0], [12.0, 996.5], [3.0, 550.0], [13.0, 697.0], [14.0, 807.0], [15.0, 1093.0], [16.0, 649.5], [4.0, 258.0], [17.0, 1012.0], [18.0, 671.0], [19.0, 821.5], [20.0, 593.0], [5.0, 1046.0], [21.0, 904.0], [22.0, 234.0], [23.0, 250.0], [24.0, 595.0], [6.0, 456.5], [25.0, 673.0], [7.0, 1039.0], [31.0, 534.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 31.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.25, "minX": 1.7076423E12, "maxY": 14.416666666666666, "series": [{"data": [[1.70764236E12, 14.416666666666666], [1.7076423E12, 13.333333333333334], [1.70764242E12, 0.25]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70764242E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.7076423E12, "maxY": 9.266666666666667, "series": [{"data": [[1.70764236E12, 9.266666666666667], [1.7076423E12, 9.166666666666666], [1.70764242E12, 0.18333333333333332]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.70764236E12, 1.3166666666666667], [1.7076423E12, 2.0166666666666666]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.70764236E12, 0.5666666666666667], [1.7076423E12, 0.2833333333333333]], "isOverall": false, "label": "401", "isController": false}, {"data": [[1.70764236E12, 1.2666666666666666], [1.70764242E12, 0.06666666666666667]], "isOverall": false, "label": "403", "isController": false}, {"data": [[1.70764236E12, 0.21666666666666667], [1.7076423E12, 0.03333333333333333]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}, {"data": [[1.70764236E12, 2.0833333333333335], [1.7076423E12, 1.45], [1.70764242E12, 0.08333333333333333]], "isOverall": false, "label": "419", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70764242E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.7076423E12, "maxY": 0.3333333333333333, "series": [{"data": [[1.70764236E12, 0.016666666666666666], [1.7076423E12, 0.31666666666666665]], "isOverall": false, "label": "https://cdn.tiny.cloud/1/7mdbxe7dmuli7pf7rc6rxh1qz3gvqgnorfos1jahj2on24k0/tinymce/5.10.9-138/cdn-init-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-0-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xd4aa084337bc556473c866c4b03f2fcd-success", "isController": false}, {"data": [[1.70764236E12, 0.31666666666666665], [1.7076423E12, 0.016666666666666666]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-0-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2-failure", "isController": false}, {"data": [[1.70764236E12, 0.2833333333333333], [1.70764242E12, 0.05]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/register-failure", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-failure", "isController": false}, {"data": [[1.70764236E12, 0.3], [1.70764242E12, 0.03333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/logout-failure", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X28a1b342cb7dc4e5fb56fe89581f94c2-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xfcfb91ea8dff40d07b20e3970587b553-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://m.stripe.network/inner.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-0-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://m.stripe.com/6-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-1-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X47c8890056c1467cbc03751ceb378378-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-0-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xca8af9be2a4b440d3541fe46f99bed9b-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/5-failure", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4a96f6c9e4d86743bdc24dc4079fa791-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-0-success", "isController": false}, {"data": [[1.70764236E12, 0.3], [1.70764242E12, 0.03333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X26232bb4a8d7e7ac19e99dac6eb1aee9-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xccaa432d29dc4b28ffa069c9cb4bc8d9-success", "isController": false}, {"data": [[1.70764236E12, 0.2833333333333333], [1.7076423E12, 0.05]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe613b4511b5d812d3628addd31e00557-success", "isController": false}, {"data": [[1.70764236E12, 0.3], [1.70764242E12, 0.03333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe9b383d681fc39eac7ea46b9605aebc8-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-1-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-success", "isController": false}, {"data": [[1.70764236E12, 0.18333333333333332], [1.7076423E12, 0.15]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe7eac5579d97e096a83d80a74458c79a-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-0-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-existing-failure", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-0-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X030d7aeca4ca281380005a0d5ed22cea-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-0-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-success", "isController": false}, {"data": [[1.70764236E12, 0.25], [1.70764242E12, 0.08333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X1a33f440d9f0b969524def540ab37ed8-success", "isController": false}, {"data": [[1.70764236E12, 0.016666666666666666], [1.7076423E12, 0.31666666666666665]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21-failure", "isController": false}, {"data": [[1.70764236E12, 0.3], [1.70764242E12, 0.03333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/register-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe67b2457347cff138c7b12e7f5369f8a-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1-failure", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcd4571b45faefa8e323c24997aa30edb-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-failure", "isController": false}, {"data": [[1.70764236E12, 0.016666666666666666], [1.7076423E12, 0.31666666666666665]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X71c79941d75b6dc184ea845d638ea15e-success", "isController": false}, {"data": [[1.70764236E12, 0.21666666666666667], [1.7076423E12, 0.11666666666666667]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-failure", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4d97084aca930a488b8557470ba1e079-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/preview-failure", "isController": false}, {"data": [[1.70764236E12, 0.25], [1.70764242E12, 0.08333333333333333]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687-failure", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X353cbd5969cc9e4a4f0b3b942d96c52a-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-success", "isController": false}, {"data": [[1.70764236E12, 0.3]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd-success", "isController": false}, {"data": [[1.70764236E12, 0.31666666666666665]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687-failure", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing-1-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X9a55d95f159d9ff09566692331988f99-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings-1-success", "isController": false}, {"data": [[1.70764236E12, 0.3], [1.70764242E12, 0.03333333333333333]], "isOverall": false, "label": "https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687-failure", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-1-success", "isController": false}, {"data": [[1.70764236E12, 0.016666666666666666]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263-failure", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://api.getaddress.io/autocomplete/e1?api-key=2LTo74BLRU-4maSsYxkcPw36687&all=true-success", "isController": false}, {"data": [[1.70764236E12, 0.03333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd-failure", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-1-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/login-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/login-failure", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products-0-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xb35ca318e338765b4ec6d9c0be510006-success", "isController": false}, {"data": [[1.70764236E12, 0.3], [1.70764242E12, 0.03333333333333333]], "isOverall": false, "label": "https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687-failure", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-1-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/shippings/create-1-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-bank-accounts-0-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X60b612f92086e03bc191fde0e6a00266-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcb3fe6472c610198d5391df44f9857bf-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws/create-1-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa88d9c4291eacb6470fd08dcb56d0ffb-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/product-listing/create-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa18a4e3c518a7d8bfd3ff0213defded3-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xaf7c98776b900bf43aaca916dfa803ae-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/products/create-1-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xec27d204ab1aee65a0c15f34e24633ec-success", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xac0cf3ead19941cc50f35f990e2ac5fc-success", "isController": false}, {"data": [[1.7076423E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/trader-withdraws-failure", "isController": false}, {"data": [[1.70764236E12, 0.3333333333333333]], "isOverall": false, "label": "https://nek-portal.buyoniasoft.com/search-upc-ean-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70764242E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.18333333333333332, "minX": 1.7076423E12, "maxY": 11.183333333333334, "series": [{"data": [[1.70764236E12, 10.583333333333334], [1.7076423E12, 11.183333333333334], [1.70764242E12, 0.18333333333333332]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.70764236E12, 4.383333333333334], [1.7076423E12, 1.7666666666666666], [1.70764242E12, 0.23333333333333334]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70764242E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
