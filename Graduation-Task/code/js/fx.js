var curr = 'EUR'; var countTime = 0;
var FXrate = 1; var FXrate1 = 1; var ii = 1;
var interval = setInterval(function () {
    countTime++;        //時間経過のカウント用
    var xhrText = 'https://www.google.com/finance/converter?a=1&from=USD&to=' + curr;
    xhr.open('GET', xhrText);
    xhr.send();
    if (countTime > 30) {   //タイムアウト処理
        clearInterval(interval);
        var dialog = Titanium.UI.createAlertDialog();
        dialog.setTitle('Server Error');
        dialog.setMessage('Please Connect to the Internet');
        dialog.show();
    }
    xhr.onload = function () {
        var num = this.responseText.indexOf("bld>") + 4;
        var num2 = this.responseText.indexOf(curr, num);
        var value = this.responseText.substr(num, num2 - num); //為替レートを抜き出す
        if (num != -1) {
            FXrate = 1 / Number(value);
            info(curr + '/USD: ' + FXrate);
            if (FXrate != FXrate1) {
                ii = ii + 1;
                FXrate1 = FXrate;
                switch (ii) {
                    case 1: curr = 'EUR'; break;
                    case 2: curr = 'JPY'; break;
                    case 3: curr = 'AUD'; break;
                    case 4: curr = 'NZD'; break;
                    case 5: curr = 'GBP'; break;
                    case 6: curr = 'CAD'; break;
                    case 7: curr = 'CHF'; break;
                    case 8: curr = 'HKD'; break;
                    case 9: curr = 'SGD'; break;
                    case 10: curr = 'CNY'; break;
                    case 11: curr = 'KRW'; break;
                    case 12: curr = 'INR'; break;
                    case 13: curr = 'ZAR'; break;
                }
            }
            if (ii > 13) {
                clearInterval(interval);
            }
        }
    };
}, 700);