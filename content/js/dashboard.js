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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 78.39285714285714, "KoPercent": 21.607142857142858};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.175, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.025, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa18a4e3c518a7d8bfd3ff0213defded3"], "isController": false}, {"data": [0.05, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X28a1b342cb7dc4e5fb56fe89581f94c2"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/search-upc-ean"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-withdraws"], "isController": false}, {"data": [0.2, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe67b2457347cff138c7b12e7f5369f8a"], "isController": false}, {"data": [0.0, 500, 1500, "https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X60b612f92086e03bc191fde0e6a00266"], "isController": false}, {"data": [0.225, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X47c8890056c1467cbc03751ceb378378"], "isController": false}, {"data": [0.825, 500, 1500, "https://m.stripe.network/inner.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false"], "isController": false}, {"data": [0.225, 500, 1500, "https://nek-portal.buyoniasoft.com/products-1"], "isController": false}, {"data": [0.45, 500, 1500, "https://nek-portal.buyoniasoft.com/products-0"], "isController": false}, {"data": [0.4, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd"], "isController": false}, {"data": [0.025, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcd4571b45faefa8e323c24997aa30edb"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-withdraws/create"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.175, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-1"], "isController": false}, {"data": [0.125, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xb35ca318e338765b4ec6d9c0be510006"], "isController": false}, {"data": [0.025, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xccaa432d29dc4b28ffa069c9cb4bc8d9"], "isController": false}, {"data": [0.4, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-0"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-bank-accounts/5"], "isController": false}, {"data": [0.075, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe7eac5579d97e096a83d80a74458c79a"], "isController": false}, {"data": [0.525, 500, 1500, "https://nek-portal.buyoniasoft.com/shippings/create-1"], "isController": false}, {"data": [0.6, 500, 1500, "https://nek-portal.buyoniasoft.com/shippings/create-0"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/products/create"], "isController": false}, {"data": [0.35, 500, 1500, "https://nek-portal.buyoniasoft.com/product-listing-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687"], "isController": false}, {"data": [0.475, 500, 1500, "https://nek-portal.buyoniasoft.com/product-listing-0"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21"], "isController": false}, {"data": [0.475, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X26232bb4a8d7e7ac19e99dac6eb1aee9"], "isController": false}, {"data": [0.15, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe613b4511b5d812d3628addd31e00557"], "isController": false}, {"data": [0.025, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xac0cf3ead19941cc50f35f990e2ac5fc"], "isController": false}, {"data": [0.25, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-withdraws/create-1"], "isController": false}, {"data": [0.45, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-withdraws/create-0"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcb3fe6472c610198d5391df44f9857bf"], "isController": false}, {"data": [0.0, 500, 1500, "https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/login"], "isController": false}, {"data": [0.6, 500, 1500, "https://nek-portal.buyoniasoft.com/shippings-0"], "isController": false}, {"data": [0.25, 500, 1500, "https://api.getaddress.io/autocomplete/e1?api-key=2LTo74BLRU-4maSsYxkcPw36687&all=true"], "isController": false}, {"data": [0.525, 500, 1500, "https://nek-portal.buyoniasoft.com/shippings-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-bank-accounts/create"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xfcfb91ea8dff40d07b20e3970587b553"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/shippings/preview"], "isController": false}, {"data": [0.35, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4d97084aca930a488b8557470ba1e079"], "isController": false}, {"data": [0.1, 500, 1500, "https://nek-portal.buyoniasoft.com/shippings/create"], "isController": false}, {"data": [0.1, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X353cbd5969cc9e4a4f0b3b942d96c52a"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/products"], "isController": false}, {"data": [0.475, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-withdraws-0"], "isController": false}, {"data": [0.125, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X030d7aeca4ca281380005a0d5ed22cea"], "isController": false}, {"data": [0.35, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-withdraws-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa88d9c4291eacb6470fd08dcb56d0ffb"], "isController": false}, {"data": [0.0, 500, 1500, "https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687"], "isController": false}, {"data": [0.1, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4a96f6c9e4d86743bdc24dc4079fa791"], "isController": false}, {"data": [0.5, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe9b383d681fc39eac7ea46b9605aebc8"], "isController": false}, {"data": [0.05, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xaf7c98776b900bf43aaca916dfa803ae"], "isController": false}, {"data": [0.2625, 500, 1500, "https://nek-portal.buyoniasoft.com/register"], "isController": false}, {"data": [0.375, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X1a33f440d9f0b969524def540ab37ed8"], "isController": false}, {"data": [0.325, 500, 1500, "https://nek-portal.buyoniasoft.com/product-listing/create-0"], "isController": false}, {"data": [0.25, 500, 1500, "https://nek-portal.buyoniasoft.com/product-listing/create-1"], "isController": false}, {"data": [0.525, 500, 1500, "https://cdn.tiny.cloud/1/7mdbxe7dmuli7pf7rc6rxh1qz3gvqgnorfos1jahj2on24k0/tinymce/5.10.9-138/cdn-init"], "isController": false}, {"data": [0.45, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-bank-accounts-0"], "isController": false}, {"data": [0.075, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xd4aa084337bc556473c866c4b03f2fcd"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2"], "isController": false}, {"data": [0.075, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-bank-accounts-1"], "isController": false}, {"data": [0.075, 500, 1500, "https://nek-portal.buyoniasoft.com/shippings"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xec27d204ab1aee65a0c15f34e24633ec"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/product-listing"], "isController": false}, {"data": [0.05, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X71c79941d75b6dc184ea845d638ea15e"], "isController": false}, {"data": [0.025, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263"], "isController": false}, {"data": [0.9, 500, 1500, "https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false"], "isController": false}, {"data": [0.075, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X9a55d95f159d9ff09566692331988f99"], "isController": false}, {"data": [0.2, 500, 1500, "https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xca8af9be2a4b440d3541fe46f99bed9b"], "isController": false}, {"data": [0.05, 500, 1500, "https://nek-portal.buyoniasoft.com/products/create-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/product-listing-existing"], "isController": false}, {"data": [0.425, 500, 1500, "https://m.stripe.com/6"], "isController": false}, {"data": [0.35, 500, 1500, "https://nek-portal.buyoniasoft.com/products/create-0"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/trader-bank-accounts"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/product-listing/create"], "isController": false}, {"data": [0.0, 500, 1500, "https://nek-portal.buyoniasoft.com/logout"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1680, 363, 21.607142857142858, 1625.9970238095248, 0, 9552, 1467.5, 2931.8, 3326.749999999999, 5566.52, 14.41973443655746, 593.4749947293939, 28.294252839958112], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa18a4e3c518a7d8bfd3ff0213defded3", 20, 0, 0.0, 2720.35, 909, 5873, 2443.5, 5490.100000000001, 5857.599999999999, 5873.0, 0.9139097057210748, 142.9975060260921, 1.0745578961798574], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X28a1b342cb7dc4e5fb56fe89581f94c2", 20, 0, 0.0, 1864.3, 1373, 2861, 1825.0, 2651.5000000000014, 2853.5, 2861.0, 3.3664366268304997, 338.9980314235819, 3.958193065140549], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/search-upc-ean", 20, 20, 100.0, 1646.8500000000001, 1, 9552, 1344.0, 1606.2, 9154.799999999996, 9552.0, 1.1032656663724625, 7.681002368573478, 1.6980486850452339], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-withdraws", 40, 20, 50.0, 2026.2500000000005, 948, 3189, 1916.0, 2962.1, 3090.85, 3189.0, 2.680965147453083, 16.50338262399464, 6.563651977211796], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe67b2457347cff138c7b12e7f5369f8a", 20, 0, 0.0, 1794.2999999999997, 695, 6714, 1603.0, 2678.7000000000003, 6513.249999999997, 6714.0, 0.9011038522189683, 36.02989834422167, 1.0595010137418337], "isController": false}, {"data": ["https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", 20, 20, 100.0, 237.80000000000004, 221, 264, 236.0, 255.70000000000002, 263.6, 264.0, 1.3358268768367618, 0.30656183208656157, 0.7231597941156827], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X60b612f92086e03bc191fde0e6a00266", 20, 0, 0.0, 2088.8, 1554, 2711, 2062.0, 2684.6000000000004, 2710.65, 2711.0, 2.864508736751647, 285.30073425415355, 3.3680356631337727], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X47c8890056c1467cbc03751ceb378378", 20, 0, 0.0, 1533.5, 649, 2532, 1563.0, 2335.2000000000003, 2523.25, 2532.0, 4.657661853749418, 503.4343433424546, 5.476391476478808], "isController": false}, {"data": ["https://m.stripe.network/inner.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", 20, 0, 0.0, 560.6499999999999, 233, 1320, 338.0, 1272.9000000000003, 1318.35, 1320.0, 5.58659217877095, 10.751189333100559, 2.76601780726257], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/products-1", 20, 0, 0.0, 1480.8500000000001, 933, 1934, 1537.5, 1767.8, 1925.75, 1934.0, 3.0344409042633895, 10.65313969807313, 4.726497306933697], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/products-0", 20, 0, 0.0, 1200.3500000000004, 775, 1524, 1274.0, 1510.3, 1523.45, 1524.0, 3.2472804026627697, 5.130956729988634, 5.067533284624128], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd", 20, 2, 10.0, 1044.5999999999997, 1, 2958, 997.5, 1541.7000000000003, 2887.699999999999, 2958.0, 0.9802960494069209, 35.44593514116263, 1.037352342907558], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcd4571b45faefa8e323c24997aa30edb", 20, 0, 0.0, 3327.75, 1290, 6522, 3314.5, 6260.500000000003, 6515.5, 6522.0, 1.18140469017662, 224.31402382745586, 1.389073483371729], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-withdraws/create", 20, 0, 0.0, 2899.7499999999995, 2629, 3153, 2873.0, 3149.3, 3153.0, 3153.0, 2.4943876278373662, 12.698479203043151, 7.814448740334247], "isController": false}, {"data": ["Test", 20, 20, 100.0, 110176.7, 103470, 116384, 110352.5, 115868.6, 116370.95, 116384.0, 0.17136051682331874, 583.7037888881273, 22.885782726645704], "isController": true}, {"data": ["https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-1", 20, 0, 0.0, 1580.1999999999998, 1323, 1822, 1618.0, 1732.3, 1817.6499999999999, 1822.0, 3.5310734463276834, 12.396688515183616, 5.500060690324859], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xb35ca318e338765b4ec6d9c0be510006", 20, 0, 0.0, 1924.2000000000003, 998, 3801, 1767.0, 3081.1000000000004, 3765.4999999999995, 3801.0, 1.1339797017633384, 114.96134502395532, 1.3333120712139253], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xccaa432d29dc4b28ffa069c9cb4bc8d9", 20, 0, 0.0, 3212.9, 1355, 6364, 3202.0, 5461.600000000002, 6324.65, 6364.0, 0.919709371838499, 189.21709021199302, 1.0813770348569853], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-bank-accounts/create-0", 20, 0, 0.0, 1377.3, 1087, 1718, 1347.0, 1656.3, 1715.05, 1718.0, 3.5984166966534725, 5.685779507016913, 5.682265428211587], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-bank-accounts/5", 20, 20, 100.0, 1105.2500000000002, 660, 1552, 1136.5, 1486.0000000000002, 1549.35, 1552.0, 3.570790930191037, 25.78362122835208, 5.694435145509731], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe7eac5579d97e096a83d80a74458c79a", 20, 0, 0.0, 2039.3500000000001, 920, 3327, 2094.0, 2704.7000000000003, 3296.6499999999996, 3327.0, 2.194666959288928, 209.15711929386592, 2.5804482607264347], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings/create-1", 20, 0, 0.0, 1021.4, 464, 1593, 1067.5, 1566.8000000000002, 1592.15, 1593.0, 1.2138868657441126, 4.261643830420005, 1.890771045763535], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings/create-0", 20, 0, 0.0, 899.9, 359, 1472, 1014.5, 1226.7, 1459.9999999999998, 1472.0, 1.3103583830177552, 2.0704686169167266, 2.0551128546157376], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/products/create", 20, 0, 0.0, 3183.4, 2820, 5041, 3024.0, 3634.7000000000003, 4971.399999999999, 5041.0, 1.9849146486701073, 10.104843812028582, 6.2028582770940845], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/product-listing-1", 20, 0, 0.0, 1311.0499999999997, 597, 1929, 1360.0, 1688.1000000000001, 1917.35, 1929.0, 1.9721920915097133, 6.92385797751701, 3.0719202987871017], "isController": false}, {"data": ["https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687", 20, 20, 100.0, 267.8, 224, 538, 249.5, 313.9, 526.7999999999998, 538.0, 0.9914733293674401, 0.2275353832044418, 0.53674144544418], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/product-listing-0", 20, 0, 0.0, 1142.45, 544, 1554, 1153.5, 1487.7, 1550.8999999999999, 1554.0, 2.012477359629704, 3.1798714530086536, 3.1543224240289796], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21", 20, 20, 100.0, 801.9500000000002, 0, 2583, 710.5, 1788.300000000001, 2545.4999999999995, 2583.0, 2.2789425706472195, 3.0321731497835005, 2.8848430734389243], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X26232bb4a8d7e7ac19e99dac6eb1aee9", 20, 0, 0.0, 991.3499999999999, 435, 2428, 1008.0, 1501.6000000000008, 2383.2999999999993, 2428.0, 1.2238404112103782, 30.68325671582426, 1.4389686084934525], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe613b4511b5d812d3628addd31e00557", 20, 0, 0.0, 1809.65, 898, 3119, 1715.5, 2840.7000000000003, 3105.7, 3119.0, 2.140640051375361, 257.6308382612651, 2.5169244354061866], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xac0cf3ead19941cc50f35f990e2ac5fc", 20, 0, 0.0, 2317.3499999999995, 1171, 4433, 2195.0, 3241.8, 4374.299999999999, 4433.0, 1.191753068764152, 183.78682796299606, 1.4012409128828507], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-withdraws/create-1", 20, 0, 0.0, 1499.5500000000002, 1290, 1725, 1504.5, 1687.4, 1723.4, 1725.0, 3.0497102775236353, 10.70674653095456, 4.750281145166209], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-withdraws/create-0", 20, 0, 0.0, 1399.85, 1231, 1542, 1402.5, 1524.5, 1541.35, 1542.0, 2.973093503790694, 4.69772000891928, 4.683202950795303], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xcb3fe6472c610198d5391df44f9857bf", 20, 0, 0.0, 1886.9500000000003, 1667, 2074, 1875.5, 2038.7, 2072.45, 2074.0, 3.0220610456331216, 314.44486155182835, 3.5532827138108187], "isController": false}, {"data": ["https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", 20, 20, 100.0, 275.84999999999997, 221, 562, 243.0, 524.6000000000005, 561.2, 562.0, 1.1706860220088973, 0.26866329606649497, 0.6337595666998361], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/login", 40, 20, 50.0, 2723.1, 370, 6882, 2267.0, 6318.999999999999, 6794.8499999999985, 6882.0, 4.16579879191835, 235.55873369480315, 4.493285903978338], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings-0", 20, 0, 0.0, 859.8999999999999, 358, 1612, 893.5, 1441.7000000000005, 1604.6, 1612.0, 1.234796567265543, 1.9510750447613756, 1.9281637803296907], "isController": false}, {"data": ["https://api.getaddress.io/autocomplete/e1?api-key=2LTo74BLRU-4maSsYxkcPw36687&all=true", 20, 0, 0.0, 1663.5499999999997, 1000, 3463, 1564.0, 3153.5000000000023, 3452.6, 3463.0, 0.9857558282813347, 1.6394929210409581, 0.4428200009857558], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings-1", 20, 0, 0.0, 928.5999999999999, 432, 1544, 881.0, 1454.8000000000002, 1540.05, 1544.0, 1.2461059190031154, 4.374756619937695, 1.9409559968847352], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-bank-accounts/create", 20, 0, 0.0, 2958.0, 2683, 3455, 2896.5, 3267.4, 3445.75, 3455.0, 2.7631942525559543, 14.066925428295109, 8.667363221884498], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xfcfb91ea8dff40d07b20e3970587b553", 20, 0, 0.0, 2294.9, 1592, 6574, 1887.0, 3764.500000000001, 6435.5999999999985, 6574.0, 1.216471017578006, 121.16081034076394, 1.4303038136366402], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings/preview", 20, 20, 100.0, 876.9500000000002, 564, 2047, 804.5, 1166.3000000000002, 2003.1499999999994, 2047.0, 0.9347978499649451, 6.7498977564851605, 12.142330275765365], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4d97084aca930a488b8557470ba1e079", 20, 0, 0.0, 1401.7500000000005, 738, 2215, 1381.5, 2014.1000000000006, 2206.2, 2215.0, 0.9660435685649423, 38.63344080568034, 1.1358559146017486], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings/create", 20, 0, 0.0, 1921.75, 845, 2684, 2124.5, 2518.8, 2676.2, 2684.0, 1.1864507326333273, 6.04000748947025, 3.7088171827727354], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X353cbd5969cc9e4a4f0b3b942d96c52a", 20, 0, 0.0, 1945.05, 1165, 4079, 1842.0, 2538.3, 4002.949999999999, 4079.0, 3.048780487804878, 309.4546434355945, 3.5846989329268295], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/products", 40, 20, 50.0, 1840.2250000000001, 558, 3420, 1720.5, 3080.9, 3198.4999999999995, 3420.0, 1.8111020556008333, 11.148712702617043, 4.97610901702436], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-withdraws-0", 20, 0, 0.0, 1251.5000000000005, 815, 1616, 1280.0, 1465.0, 1608.5, 1616.0, 3.442340791738382, 5.439167383820998, 5.398827452667814], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X030d7aeca4ca281380005a0d5ed22cea", 20, 0, 0.0, 1909.7999999999997, 870, 3284, 1806.0, 3061.9, 3272.8999999999996, 3284.0, 1.1098163253981466, 119.53485907066755, 1.3049012263470394], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-withdraws-1", 20, 0, 0.0, 1474.9000000000003, 1302, 1722, 1442.5, 1667.7, 1719.3, 1722.0, 3.155071777882947, 11.07664359520429, 4.91439402902666], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xa88d9c4291eacb6470fd08dcb56d0ffb", 20, 0, 0.0, 1887.55, 1507, 2099, 1891.5, 2087.1, 2098.55, 2099.0, 2.656748140276302, 303.6049529672556, 3.123754649309246], "isController": false}, {"data": ["https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", 20, 20, 100.0, 246.35000000000002, 222, 275, 245.0, 266.40000000000003, 274.6, 275.0, 1.3370771493515177, 0.30684875986094395, 0.7238366384209118], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X4a96f6c9e4d86743bdc24dc4079fa791", 20, 0, 0.0, 1779.8500000000001, 1365, 2307, 1746.5, 2175.8, 2300.9, 2307.0, 3.0534351145038165, 316.61229723282446, 3.590171755725191], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xe9b383d681fc39eac7ea46b9605aebc8", 20, 0, 0.0, 941.7999999999998, 530, 1449, 957.5, 1390.9, 1446.2, 1449.0, 1.2701638511367965, 32.32963927346628, 1.4934348405944367], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xaf7c98776b900bf43aaca916dfa803ae", 20, 0, 0.0, 2594.15, 1276, 4351, 2288.5, 4033.7000000000007, 4336.45, 4351.0, 0.994184023462743, 166.12387843614852, 1.1689429338370532], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/register", 40, 20, 50.0, 901.35, 480, 1728, 953.0, 1210.1999999999998, 1286.2999999999997, 1728.0, 2.251998648800811, 21.455565251660847, 4.762405345681793], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X1a33f440d9f0b969524def540ab37ed8", 20, 0, 0.0, 1316.1999999999998, 779, 2975, 1322.5, 1576.5, 2905.1499999999987, 2975.0, 1.3869625520110958, 151.1909728242025, 1.6307645631067962], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/product-listing/create-0", 20, 0, 0.0, 1346.0000000000002, 732, 1807, 1429.0, 1569.8, 1795.2499999999998, 1807.0, 1.8392495861688432, 2.90642745884679, 2.8953811844767334], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/product-listing/create-1", 20, 0, 0.0, 1529.8000000000002, 1001, 2069, 1504.5, 1888.5, 2060.0499999999997, 2069.0, 1.7635129177321223, 6.191583634600124, 2.7468780310378276], "isController": false}, {"data": ["https://cdn.tiny.cloud/1/7mdbxe7dmuli7pf7rc6rxh1qz3gvqgnorfos1jahj2on24k0/tinymce/5.10.9-138/cdn-init", 20, 0, 0.0, 1100.2, 451, 2836, 777.5, 2670.7000000000003, 2828.35, 2836.0, 2.1510002151000216, 0.915855560335556, 3.0143411217466123], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-bank-accounts-0", 20, 0, 0.0, 1228.7, 576, 1647, 1410.0, 1630.8000000000004, 1646.95, 1647.0, 4.16406412658755, 6.5795466375182174, 6.547014886529253], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xd4aa084337bc556473c866c4b03f2fcd", 20, 0, 0.0, 1869.45, 947, 2921, 1881.0, 2329.7000000000003, 2892.4999999999995, 2921.0, 1.8756447528838038, 191.17536619033103, 2.20534793210166], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2", 20, 20, 100.0, 1093.85, 364, 4455, 893.0, 1771.3000000000009, 4322.949999999998, 4455.0, 0.9830908375933936, 1.1838372185902477, 1.4650357599292174], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-bank-accounts-1", 20, 0, 0.0, 1691.75, 894, 2125, 1719.5, 2120.6, 2125.0, 2125.0, 3.8468936333910366, 13.505451769571073, 5.991987641854203], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings", 40, 20, 50.0, 1319.675, 591, 2636, 1069.0, 2388.4, 2517.2999999999997, 2636.0, 0.8937748581132412, 5.501865056754704, 7.49365629329222], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xec27d204ab1aee65a0c15f34e24633ec", 20, 0, 0.0, 1895.95, 1712, 2126, 1893.0, 2089.3, 2124.5, 2126.0, 2.882259691598213, 298.19157907299325, 3.388906903011961], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1", 20, 20, 100.0, 941.75, 0, 5172, 888.5, 1562.9000000000005, 4993.149999999998, 5172.0, 1.1897679952409281, 1.7334129610350983, 1.2411232153480072], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/product-listing", 20, 0, 0.0, 2453.8500000000004, 1632, 3110, 2603.5, 3092.3, 3109.65, 3110.0, 1.7979144192736425, 9.1528592457749, 5.618482560230133], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X71c79941d75b6dc184ea845d638ea15e", 20, 0, 0.0, 2896.0499999999997, 1178, 6662, 2213.5, 5812.500000000003, 6624.999999999999, 6662.0, 1.9157088122605364, 354.64952256944446, 2.2524545019157087], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263", 20, 1, 5.0, 2263.6000000000004, 0, 4858, 2142.5, 3223.0, 4776.649999999999, 4858.0, 1.1830119484206791, 111.57737776159352, 1.3214151041050515], "isController": false}, {"data": ["https://js.stripe.com/v3/m-outer-3437aaddcdf6922d623e172c2d6f9278.html#url=https%3A%2F%2Fnek-portal.buyoniasoft.com%2Flogin&title=NEK%20Mart&referrer=&muid=718e74e3-e119-4435-8f8c-f2f886b1dbe7fa4e3b&sid=9c35f426-eaa8-4fd7-86f4-b8b616c41a4108e2c0&version=6&preview=false", 20, 0, 0.0, 434.8, 299, 739, 435.0, 577.9000000000001, 731.1999999999998, 739.0, 5.151983513652756, 8.01475560278207, 2.7269287738279235], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X9a55d95f159d9ff09566692331988f99", 20, 0, 0.0, 2658.15, 1162, 4584, 2817.0, 4375.200000000002, 4577.2, 4584.0, 0.9273426994945982, 144.6914520737701, 1.090352158390133], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=Xca8af9be2a4b440d3541fe46f99bed9b", 20, 0, 0.0, 1656.1999999999998, 1141, 2831, 1552.5, 2722.000000000002, 2829.95, 2831.0, 3.1402103940964046, 318.8135401946931, 3.6922005024336633], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/products/create-1", 20, 0, 0.0, 1743.25, 1452, 3663, 1583.5, 2053.0, 3582.8499999999985, 3663.0, 2.331274041263551, 8.184502127287562, 3.6312325154446903], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/product-listing-existing", 20, 20, 100.0, 836.85, 1, 1996, 766.5, 1445.0000000000005, 1969.2499999999995, 1996.0, 1.2384667781286767, 8.301839510186388, 17.7490189020992], "isController": false}, {"data": ["https://m.stripe.com/6", 20, 0, 0.0, 1338.5000000000002, 1196, 1548, 1295.5, 1543.3, 1547.85, 1548.0, 5.228758169934641, 4.549632352941177, 8.149509803921568], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/products/create-0", 20, 0, 0.0, 1439.7500000000002, 1212, 1660, 1415.0, 1641.1000000000001, 1659.35, 1660.0, 2.653927813163482, 4.193413282908705, 4.159720839968153], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-bank-accounts", 40, 20, 50.0, 2087.975, 587, 3772, 1941.0, 3147.2, 3358.2499999999995, 3772.0, 2.594033722438392, 15.968253485732815, 6.3229571984435795], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/product-listing/create", 20, 0, 0.0, 2876.2500000000005, 2207, 3483, 2948.5, 3363.3, 3477.35, 3483.0, 1.6564518800728838, 8.433265047830048, 5.187735526751698], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/logout", 20, 20, 100.0, 791.8, 384, 1254, 782.0, 1183.7000000000003, 1251.35, 1254.0, 1.207437816952427, 8.718550018111568, 1.907846081864284], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: nek-portal.buyoniasoft.com:443 failed to respond", 15, 4.132231404958677, 0.8928571428571429], "isController": false}, {"data": ["403/Forbidden", 80, 22.038567493112946, 4.761904761904762], "isController": false}, {"data": ["401/Unauthorized", 51, 14.049586776859504, 3.0357142857142856], "isController": false}, {"data": ["419/unknown status", 217, 59.77961432506887, 12.916666666666666], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1680, 363, "419/unknown status", 217, "403/Forbidden", 80, "401/Unauthorized", 51, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: nek-portal.buyoniasoft.com:443 failed to respond", 15, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/search-upc-ean", 20, 20, "419/unknown status", 19, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: nek-portal.buyoniasoft.com:443 failed to respond", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-withdraws", 40, 20, "419/unknown status", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://api.getaddress.io/get/M2JjNjc1NTE4ZDU3ZmRiIDIzMTQ5MjIzNzYgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", 20, 20, "403/Forbidden", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X0fb272b45e791dc5d31778adefda79fd", 20, 2, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: nek-portal.buyoniasoft.com:443 failed to respond", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-bank-accounts/5", 20, 20, "419/unknown status", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://api.getaddress.io/get/NDExZDllODI1M2Q3MmUwIDU0OTUxNDgzIDY2MWJhYjk2NmM3Y2RiNw==?api-key=2LTo74BLRU-4maSsYxkcPw36687", 20, 20, "403/Forbidden", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/check-brand-authorization?brandId=21", 20, 20, "401/Unauthorized", 17, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: nek-portal.buyoniasoft.com:443 failed to respond", 3, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://api.getaddress.io/get/OGEzYzFkNTZlMjUyYWE5IDIzNDEzODkxNjIgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", 20, 20, "403/Forbidden", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/login", 40, 20, "419/unknown status", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings/preview", 20, 20, "419/unknown status", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/products", 40, 20, "419/unknown status", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://api.getaddress.io/get/YWZjNzY1NGU0OGQzMzEyIDM4NjE3ODA5NjkgNjYxYmFiOTY2YzdjZGI3?api-key=2LTo74BLRU-4maSsYxkcPw36687", 20, 20, "403/Forbidden", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/register", 40, 20, "419/unknown status", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/2", 20, 20, "401/Unauthorized", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings", 40, 20, "419/unknown status", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/shippings/warehouse/fetch-warehouse/1", 20, 20, "401/Unauthorized", 14, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: nek-portal.buyoniasoft.com:443 failed to respond", 6, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/_debugbar/open?op=get&id=X32e7ebea66f32a67d8c0aa5f42e65263", 20, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: nek-portal.buyoniasoft.com:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/product-listing-existing", 20, 20, "419/unknown status", 18, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: nek-portal.buyoniasoft.com:443 failed to respond", 2, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/trader-bank-accounts", 40, 20, "419/unknown status", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://nek-portal.buyoniasoft.com/logout", 20, 20, "419/unknown status", 20, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
