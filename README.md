# shaba
<a href="https://www.coffeebede.com/smabedy"><img width="128px" height="64px" class="img-fluid" src="https://coffeebede.ir/DashboardTemplateV2/app-assets/images/banner/default-yellow.svg" /></a><br/>

اعتبار سنجی شماره شبا، شماره کارت و تشخیص بانک (به همراه تصویر) 

پیشنمایش: [کلیک کنید](https://smohamadabedy.github.io/shaba/) |
[نسخه به همراه jquery در codepen](https://codepen.io/smohammadabedy/pen/WNKLOWW)
```
contribution: create pull/merge request on branch name shaba{weeknumber}{month}{year}
```

<h3>📦 نصب</h3>
    <p><strong>CDN:</strong></p>
    <pre dir="ltr"><code>&lt;script src="https://cdn.jsdelivr.net/gh/smohamadabedy/shaba@master/dist/shaba.min.js"&gt;&lt;/script&gt;</code></pre>

  <p><strong>NPM:</strong></p>
  <pre dir="ltr"><code>npm install shaba</code></pre>
<br/><br/>

 <h3>🧪 مثال استفاده</h3>
    <pre dir="ltr"><code>
const card = shaba.convertPersianToEnglishDigits('۶۰۳۷۹۹...');
const isValid = shaba.validateCard(card);
const prefix = card.slice(0, 6);
const bank = shaba.getBankFromCard(prefix);
console.log(bank); // ["meli", "603799", "بانک ملی"]
    </code></pre>
	<br/><br/>
    <h3>🧠 توابع در دسترس</h3>
    <ul>
      <li><code>convertPersianToEnglishDigits(str)</code> — تبدیل ارقام فارسی/عربی به انگلیسی</li>
      <li><code>validateCard(cardNumber)</code> — بررسی اعتبار شماره کارت</li>
      <li><code>getBankFromCard(prefix)</code> — دریافت اطلاعات بانک از روی شماره کارت</li>
      <li><code>getBankFromShaba(code)</code> — دریافت بانک از کد شبا</li>
    </ul>
	<br/><br/>
    <h3>🖼 استفاده از لوگوهای بانکی</h3>
    <pre dir="ltr"><code>&lt;img src="https://cdn.jsdelivr.net/gh/smohamadabedy/shaba@master/bank-iran/meli.png"&gt;</code></pre>
	<br/><br/>
	<h3>🧪 نمونه کد</h3>
<pre dir="ltr"><code dir="ltr">&lt;script src=&quot;dist/shaba.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
  // DOM Elements
  const $card = document.getElementById(&#39;cardInput&#39;); // Card number input field
  const $shaba = document.getElementById(&#39;shabaInput&#39;); // Shaba number input field

  // Card Number Validation Logic
  $card.addEventListener(&#39;input&#39;, function () {
    // 1. Convert Persian digits to English (for compatibility)
    const card = shaba.convertPersianToEnglishDigits(this.value);
    
    // 2. Validate card number format
    const isValid = shaba.validateCard(card);
    
    // 3. Extract first 6 digits (bank identifier)
    const prefix = card.slice(0, 6);
    
    // 4. Get bank information from prefix
    const bank = shaba.getBankFromCard(prefix);
    
    // 5. Update bank logo display
    document.getElementById(&#39;cardBankLogo&#39;).src = &quot;./bank-iran/&quot; + bank[0] + &quot;.png&quot;;
    
    // 6. Visual feedback (green=valid, red=invalid)
    this.style.borderColor = isValid ? &#39;green&#39; : &#39;red&#39;;
  });

  // Shaba Number (IBAN) Validation Logic
  $shaba.addEventListener(&#39;input&#39;, function () {
    // 1. Standardize input: uppercase, remove hyphens, convert Persian digits
    const input = shaba.convertPersianToEnglishDigits(
      this.value.toUpperCase().replace(/-/g, &#39;&#39;)
    );
    
    // 2. Extract bank code (positions 3-5 in Iranian IBAN format)
    const code = input.slice(2, 5);
    
    // 3. Get bank information from code
    const bank = shaba.getBankFromShaba(code);
    
    // 4. Update bank logo display
    document.getElementById(&#39;shabaBankLogo&#39;).src = &quot;./bank-iran/&quot; + bank[0] + &quot;.png&quot;;

    // 5. IBAN Validation Steps:
    //    a) Prepare string according to ISO13616 standard
    const prepared = shaba.iso13616Prepare(input);
    //    b) Verify using MOD97-10 algorithm
    const valid = shaba.iso7064Mod97_10(prepared) === 1;
    
    // 6. Visual feedback
    this.style.borderColor = valid ? &#39;green&#39; : &#39;red&#39;;
  });
&lt;/script&gt;
</code></pre>
<hr/>
	<h2>دستورالعمل تشخیص بانک از طریق شماره شبا</h2>

<table>
    <thead>
        <tr>
            <th>ردیف</th>
            <th>نام بانک</th>
            <th>شناسه بانک</th>
            <th>الگوی رجکس</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>1</td><td>بانک مرکزی جمهوری اسلامی ایران</td><td>010</td><td><span class="regex">/\d{2}(010)\d+/g</span></td></tr>
        <tr><td>2</td><td>بانک صنعت و معدن</td><td>011</td><td><span class="regex">/\d{2}(011)\d+/g</span></td></tr>
        <tr><td>3</td><td>بانک ملت</td><td>012</td><td><span class="regex">/\d{2}(012)\d+/g</span></td></tr>
        <tr><td>4</td><td>بانک رفاه</td><td>013</td><td><span class="regex">/\d{2}(013)\d+/g</span></td></tr>
        <tr><td>5</td><td>بانک مسکن</td><td>014</td><td><span class="regex">/\d{2}(014)\d+/g</span></td></tr>
        <tr><td>6</td><td>بانک سپه</td><td>015</td><td><span class="regex">/\d{2}(015)\d+/g</span></td></tr>
        <tr><td>7</td><td>بانک کشاورزی</td><td>016</td><td><span class="regex">/\d{2}(016)\d+/g</span></td></tr>
        <tr><td>8</td><td>بانک ملی ایران</td><td>017</td><td><span class="regex">/\d{2}(017)\d+/g</span></td></tr>
        <tr><td>9</td><td>بانک تجارت</td><td>018</td><td><span class="regex">/\d{2}(018)\d+/g</span></td></tr>
        <tr><td>10</td><td>بانک صادرات ایران</td><td>019</td><td><span class="regex">/\d{2}(019)\d+/g</span></td></tr>
        <tr><td>11</td><td>بانک توسعه صادرات</td><td>020</td><td><span class="regex">/\d{2}(020)\d+/g</span></td></tr>
        <tr><td>12</td><td>پست بانک ایران</td><td>021</td><td><span class="regex">/\d{2}(021)\d+/g</span></td></tr>
        <tr><td>13</td><td>بانک توسعه تعاون</td><td>022</td><td><span class="regex">/\d{2}(022)\d+/g</span></td></tr>
        <tr><td>14</td><td>موسسه اعتباری توسعه</td><td>051</td><td><span class="regex">/\d{2}(051)\d+/g</span></td></tr>
        <tr><td>15</td><td>بانک کارآفرین</td><td>053</td><td><span class="regex">/\d{2}(053)\d+/g</span></td></tr>
        <tr><td>16</td><td>بانک پارسیان</td><td>054</td><td><span class="regex">/\d{2}(054)\d+/g</span></td></tr>
        <tr><td>17</td><td>بانک اقتصاد نوین</td><td>055</td><td><span class="regex">/\d{2}(055)\d+/g</span></td></tr>
        <tr><td>18</td><td>بانک سامان</td><td>056</td><td><span class="regex">/\d{2}(056)\d+/g</span></td></tr>
        <tr><td>19</td><td>بانک پاسارگاد</td><td>057</td><td><span class="regex">/\d{2}(057)\d+/g</span></td></tr>
        <tr><td>20</td><td>بانک سرمایه</td><td>058</td><td><span class="regex">/\d{2}(058)\d+/g</span></td></tr>
        <tr><td>21</td><td>بانک سینا</td><td>059</td><td><span class="regex">/\d{2}(059)\d+/g</span></td></tr>
        <tr><td>22</td><td>قرض الحسنه مهر</td><td>060</td><td><span class="regex">/\d{2}(060)\d+/g</span></td></tr>
        <tr><td>23</td><td>بانک شهر</td><td>061</td><td><span class="regex">/\d{2}(061)\d+/g</span></td></tr>
        <tr><td>24</td><td>بانک تات</td><td>062</td><td><span class="regex">/\d{2}(062)\d+/g</span></td></tr>
        <tr><td>25</td><td>بانک انصار</td><td>063</td><td><span class="regex">/\d{2}(063)\d+/g</span></td></tr>
        <tr><td>26</td><td>بانک گردشگری</td><td>064</td><td><span class="regex">/\d{2}(064)\d+/g</span></td></tr>
        <tr><td>27</td><td>بانک حکمت ایرانیان</td><td>065</td><td><span class="regex">/\d{2}(065)\d+/g</span></td></tr>
        <tr><td>28</td><td>بانک دی</td><td>066</td><td><span class="regex">/\d{2}(066)\d+/g</span></td></tr>
        <tr><td>29</td><td>بانک ایران زمین</td><td>069</td><td><span class="regex">/\d{2}(069)\d+/g</span></td></tr>
    </tbody>
</table>
<br/>
<h2>دستورالعمل تشخیص بانک از شماره کارت</h2>

<table>
    <thead>
        <tr>
            <th>نام بانک</th>
            <th>پیش شماره</th>
            <th>الگوی رجکس</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>بانک ملی</td><td>۶۰۳۷۹۹</td><td><span class="regex">/(603799)\d+/g</span></td></tr>
        <tr><td>بانک سامان</td><td>۶۲۱۹۸۶</td><td><span class="regex">/(621986)\d+/g</span></td></tr>
        <tr><td>بانک سپه</td><td>۵۸۹۲۱۰</td><td><span class="regex">/(589210)\d+/g</span></td></tr>
        <tr><td>بانک سینا</td><td>۶۳۹۳۴۶</td><td><span class="regex">/(639346)\d+/g</span></td></tr>
        <tr><td>بانک توسعه صادرات</td><td>۶۲۷۶۴۸</td><td><span class="regex">/(627648)\d+/g</span></td></tr>
        <tr><td>بانک سرمایه</td><td>۶۳۹۶۰۷</td><td><span class="regex">/(639607)\d+/g</span></td></tr>
        <tr><td>بانک صنعت و معدن</td><td>۶۲۷۹۶۱</td><td><span class="regex">/(627961)\d+/g</span></td></tr>
        <tr><td>بانک شهر</td><td>۵۰۴۷۰۶</td><td><span class="regex">/(504706)\d+/g</span></td></tr>
        <tr><td>بانک کشاورزی</td><td>۶۰۳۷۷۰</td><td><span class="regex">/(603770)\d+/g</span></td></tr>
        <tr><td>بانک دی</td><td>۵۰۲۹۳۸</td><td><span class="regex">/(502938)\d+/g</span></td></tr>
        <tr><td>بانک مسکن</td><td>۶۲۸۰۲۳</td><td><span class="regex">/(628023)\d+/g</span></td></tr>
        <tr><td>بانک صادرات</td><td>۶۰۳۷۶۹</td><td><span class="regex">/(603769)\d+/g</span></td></tr>
        <tr><td>پست بانک</td><td>۶۲۷۷۶۰</td><td><span class="regex">/(627760)\d+/g</span></td></tr>
        <tr><td>بانک ملت</td><td>۶۱۰۴۳۳</td><td><span class="regex">/(610433)\d+/g</span></td></tr>
        <tr><td>بانک توسعه تعاون</td><td>۵۰۲۹۰۸</td><td><span class="regex">/(502908)\d+/g</span></td></tr>
        <tr><td>بانک تجارت</td><td>۶۲۷۳۵۳</td><td><span class="regex">/(627383)\d+/g</span></td></tr>
        <tr><td>بانک اقتصاد نوین</td><td>۶۲۷۴۱۲</td><td><span class="regex">/(627412)\d+/g</span></td></tr>
        <tr><td>بانک رفاه</td><td>۵۸۹۴۶۳</td><td><span class="regex">/(589463)\d+/g</span></td></tr>
        <tr><td>بانک پارسیان</td><td>۶۲۲۱۰۶</td><td><span class="regex">/(622106)\d+/g</span></td></tr>
        <tr><td>موسسه نور</td><td>۵۰۷۶۷۷</td><td><span class="regex">/(507677)\d+/g</span></td></tr>
        <tr><td>بانک پاسارگاد</td><td>۵۰۲۲۲۹</td><td><span class="regex">/(502229)\d+/g</span></td></tr>
        <tr><td>موسسه ملل</td><td>۶۰۶۲۵۶</td><td><span class="regex">/(606256)\d+/g</span></td></tr>
        <tr><td>بانک قوامین</td><td>۶۳۹۵۹۹</td><td><span class="regex">/(639599)\d+/g</span></td></tr>
        <tr><td>بانک قرض الحسنه مهر ایرانیان</td><td>۶۰۶۳۷۳</td><td><span class="regex">/(606373)\d+/g</span></td></tr>
        <tr><td>بانک کارآفرین</td><td>۶۲۷۴۸۸</td><td><span class="regex">/(627488)\d+/g</span></td></tr>
        <tr><td>بانک گردشگری</td><td>۵۰۵۴۱۶</td><td><span class="regex">/(505416)\d+/g</span></td></tr>
    </tbody>
</table>
