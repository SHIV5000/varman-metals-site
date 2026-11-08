function toggleMenu(){const el=document.getElementById("mobileNav");if(el)el.classList.toggle("open");}
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.getElementById("mobileNav")?.classList.remove("open");});
document.addEventListener("DOMContentLoaded",()=>{
 const form=document.querySelector("#rfq-form");if(!form)return;
 const qty=document.querySelector("#quantity"),report=document.querySelector("#report-status");
 const hindi=document.documentElement.lang.toLowerCase().startsWith("hi");
 const noteHi="10 मीट्रिक टन से अधिक ऑर्डर पर हर बैच की गुणवत्ता जाँच रिपोर्ट मिलेगी।";
 const noteEn="For orders above 10 MT, a quality analysis report is supplied with each batch.";
 function refresh(){
  const value=Number(qty.value);
  if(!qty.value||!(value>0)){report.textContent=hindi?noteHi:noteEn;return;}
  if(value>10){report.textContent=hindi?"आपका ऑर्डर 10 टन से अधिक है। हर बैच के साथ गुणवत्ता जाँच रिपोर्ट मिलेगी।":"Your order exceeds 10 MT: a quality analysis report will be supplied with each batch.";}
  else{report.textContent=hindi?"जाँच रिपोर्ट की यह सुविधा केवल 10 टन से अधिक ऑर्डर पर मिलेगी।":"The batch-report commitment applies only to orders above 10 MT.";}
 }
 qty.addEventListener("input",refresh);refresh();
 form.addEventListener("submit",e=>{
  e.preventDefault();
  if(!form.reportValidity())return;
  const f=new FormData(form),s=k=>String(f.get(k)||"").trim();
  const app=s("application")==="Brass manufacturing"?(hindi?"पीतल भट्टी":"Brass manufacturing"):(hindi?"धातु / एलॉय बनाना":"Industrial alloying");
  const msg=hindi?[
   "नमस्ते Varman Metals, मुझे जस्ता सिल्लियों का थोक भाव चाहिए।",
   "माल: रीमेल्टेड जस्ता सिल्लियाँ (90–95% Zn)",
   "मात्रा: "+s("quantity")+" मीट्रिक टन",
   "काम: "+app,
   "फर्म/भट्टी: "+s("company"),
   "नाम: "+s("person"),
   "मोबाइल: "+s("phone"),
   "माल कहाँ चाहिए: "+s("destination"),
   "दूसरी जानकारी: "+(s("notes")||"नहीं")
  ].join("\n"):[
   "Hello Varman Metals. Please quote your remelted zinc ingots.",
   "Product: Remelted Zinc Ingots (90–95% Zn)",
   "Quantity: "+s("quantity")+" MT",
   "Application: "+app,
   "Company: "+s("company"),
   "Contact: "+s("person"),
   "Phone: "+s("phone"),
   "Destination: "+s("destination"),
   "Other requirements: "+(s("notes")||"None")
  ].join("\n");
  if(typeof gtag==="function")gtag("event","generate_lead",{event_category:"WhatsApp",event_label:"90-95 remelted zinc RFQ",language:hindi?"hi":"en"});
  const url="https://wa.me/916396811315?text="+encodeURIComponent(msg);
  const opened=window.open(url,"_blank");
  if(opened){opened.opener=null;}else{let link=form.querySelector("#whatsapp-fallback");if(!link){link=document.createElement("a");link.id="whatsapp-fallback";link.target="_blank";link.rel="noopener noreferrer";form.appendChild(link);}link.href=url;link.textContent=hindi?"WhatsApp खोलें":"Open WhatsApp enquiry";}
 });
});