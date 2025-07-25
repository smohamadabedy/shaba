/**
 * shaba.js
 * Utility functions for validating Iranian card numbers and IBAN (Sheba) codes,
 * and identifying banks based on card prefix or Shaba bank code.
 * By SMH Abedy
 * Note: 'shaba' is an incorrect spelling of 'sheba'.
 */
 
(function (global) {
    const shaba = {

        convertPersianToEnglishDigits(str) {
            const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
            const arabic = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
            const english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

            for (let i = 0; i < 10; i++) {
                str = str.replace(new RegExp(persian[i], 'g'), english[i])
                         .replace(new RegExp(arabic[i], 'g'), english[i]);
            }
            return str;
        },

        iso13616Prepare(iban) {
			iban = "IR" + iban
            iban = iban.toUpperCase();
            iban = iban.slice(4) + iban.slice(0, 4);
            return iban.split('').map(char => {
                const code = char.charCodeAt(0);
                return code >= 65 && code <= 90 ? (code - 55).toString() : char;
            }).join('');
        },

        iso7064Mod97_10(preparedIban) {
            let remainder = preparedIban;
            while (remainder.length > 2) {
                const block = remainder.slice(0, 9);
                remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
            }
            return parseInt(remainder, 10) % 97;
        },

        validateCard(cardNumber) {
            cardNumber = shaba.convertPersianToEnglishDigits(cardNumber);
            if (!/^\d{16}$/.test(cardNumber)) return false;

            const digits = cardNumber.split('').map(Number);
            const checkSum = digits.reduce((sum, digit, index) => {
                let num = digit * (index % 2 === 0 ? 2 : 1);
                return sum + (num > 9 ? num - 9 : num);
            }, 0);

            return checkSum % 10 === 0;
        },

        getBankFromCard(prefix) {
            const map = {
				
                '636795': ["markazi", "636795", "بانک مرکزی"],
                '603799': ["meli", "603799", "بانک ملی"],
                '589210': ["sepah", "589210", "بانک سپه"],
                '627961': ["sanatmadan", "627961", "بانک صنعت و معدن"],
                '603770': ["keshavarsi", "603770", "بانک کشاورزی"],
                '628023': ["maskan", "628023", "بانک مسکن"],
                '627760': ["postbank", "627760", "پست بانک"],
                '502908': ["tosehe", "502908", "بانک توسعه"],
                '627412': ["eghtesad", "627412", "بانک اقتصاد"],
                '622106': ["parsian", "622106", "بانک پارسیان"],
                '502229': ["pasargad", "502229", "بانک پاسارگاد"],
                '627488': ["karafarin", "627488", "بانک کارآفرین"],
                '621986': ["saman", "621986", "بانک سامان"],
                '639346': ["sina", "639346", "بانک سینا"],
                '639607': ["sarmaye", "639607", "بانک سرمایه"],
                '502806': ["shahr", "502806", "بانک شهر"],
				'504706': ["shahr", "504706", "بانک شهر"],
                '502938': ["day", "502938", "بانک دی"],
                '603769': ["saderat", "603769", "بانک صادرات"],
                '610433': ["mellat", "610433", "بانک ملت"],
                '627353': ["tejarat", "627353", "بانک تجارت"],
				'585983': ["tejarat", "585983", "بانک تجارت"],
                '589463': ["refah", "589463", "بانک رفاه"],
                '627381': ["ansar", "627381", "بانک انصار"],
                '639370': ["sepah", "639370", " بانک مهراقتصاد"],
				'606373': ["mehreqtesad", "606373", "بانک قرض الحسنه مهر"],
                '639599': ["ghavamin", "639599", "بانک قوامین"],
                '504172': ["resalat", "504172", "بانک رسالت"],
				'636214': ["ayandeh", "636214", "بانک آینده"],
				'505785': ["iranzamin", "505785", "بانک ایران زمین"],
            };
            return map[prefix] || ["no-img", null, "نامشخص"];
        },

        getBankFromShaba(code) {
            const map = {
                '010': ["markazi", "بانک مرکزی", "010"],
                '011': ["sanatmadan", "بانک صنعت و معدن", "011"],
                '012': ["mellat", "بانک ملت", "012"],
                '013': ["refah", "بانک رفاه", "013"],
                '014': ["maskan", "بانک مسکن", "014"],
                '015': ["sepah", "بانک سپه", "015"],
                '016': ["keshavarsi", "بانک کشاورزی", "016"],
                '017': ["meli", "بانک ملی ایران", "017"],
                '018': ["tejarat", "بانک تجارت", "018"],
                '019': ["saderat", "بانک صادرات", "019"],
                '020': ["tooseesaderat", "بانک توسعه صادرات", "020"],
                '021': ["postbank", "پست بانک ایران", "021"],
                '022': ["toosetaavon", "بانک توسعه تعاون", "022"],
                '051': ["etebaritosee", "موسسه اعتباری توسعه", "051"],
                '053': ["karafarin", "بانک کارآفرین", "053"],
                '054': ["parsian", "بانک پارسیان", "054"],
                '055': ["eghtesad", "بانک اقتصاد نوین", "055"],
                '056': ["saman", "بانک سامان", "056"],
                '057': ["pasargad", "بانک پاسارگاد", "057"],
                '058': ["sarmaye", "بانک سرمایه", "058"],
                '059': ["sina", "بانک سینا", "059"],
                '060': ["mehreqtesad", "بانک قرض الحسنه مهر", "060"],
                '061': ["shahr", "بانک شهر", "061"],
                '062': ["ayandeh", "بانک آینده", "062"],
                '063': ["ansar", "بانک انصار", "063"],
                '064': ["gardeshgari", "بانک گردشگری", "064"],
                '065': ["hekmat", "بانک حکمت ایرانیان", "065"],
                '066': ["day", "بانک دی", "066"],
                '069': ["iranzamin", "بانک ایران زمین", "069"],
                '070': ["resalat", "بانک رسالت", "070"]
            };
            return map[code] || ["no-img", "نامشخص", "000"];
        }
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = shaba;
    } else {
        global.shaba = shaba;
    }

})(typeof window !== 'undefined' ? window : global);