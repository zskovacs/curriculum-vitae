(function () {
	"use strict";

	var translations = {
		en: {
			pageTitle: "Zsolt Kovács | Full Stack .NET Developer",
			metaDescription: "Zsolt Kovács - Full Stack .NET Developer with over 10 years of experience in software development, specializing in ASP.NET Core, Angular, and .NET.",
			"hero.title": "Zsolt Kovács",
			"hero.subtitle": "Full Stack .NET Developer",
			"nav.menu": "Menu",
			"nav.home": "Home",
			"nav.about": "About",
			"nav.skills": "Skills",
			"nav.experience": "Experience",
			"nav.education": "Education",
			"nav.contact": "Contact",
			"about.heading": "About me",
			"about.lead": "A small introduction about myself",
			"about.role": "Full Stack .NET Developer",
			"about.paragraph1": "I am a passionate developer committed to designing and building modern, user-friendly, and feature-rich applications and websites using cutting-edge technologies. With over 10 years of experience as a .NET developer, I have collaborated with SaaS companies, startups, and corporations in Hungary, spanning various industries such as accounting, insurance, automotive, and services.",
			"about.paragraph2": "My expertise lies in designing and developing software, managing complex databases, writing and testing code, and troubleshooting issues. I bring a unique blend of dedication and professionalism to every project, ensuring high-quality outcomes that align with industry standards and client expectations.",
			"about.resume": "Download Printable Resume",
			"skills.heading": "Technical Skills",
			"skills.lead": "I can say I'm quite good at",
			"skills.vibeTitle": "VIBE CODING",
			"skills.vibeTools": "Codex, Claude, Cursor",
			"skills.databases": "Databases",
			"skills.devops": "Cloud & DevOps",
			"skills.messaging": "NoSQL & Messaging",
			"experience.heading": "Work Experience",
			"experience.lead": "My previous associations",
			"experience.mi.date": "Aug, 2024<br>Present",
			"experience.mi.role": "Lead software developer",
			"experience.mi.description": "I led a team responsible for developing a business management platform built on ASP.NET Core and Angular. This high-load system leveraged technologies such as Redis and RabbitMQ (MassTransit), where security and high availability were paramount.",
			"experience.cmg.date": "Apr, 2018<br>Aug, 2024",
			"experience.cmg.role": "Senior software developer",
			"experience.cmg.description": "Managed the entire lifecycle of software development for multiple company projects. Developed an application to streamline policy and contract organization for insurance brokers. Collaborated with a team to create factoring software that directly connected with major insurance companies.",
			"experience.xapt.date": "Dec, 2015<br>Apr, 2018",
			"experience.xapt.role": "Lead software developer",
			"experience.xapt.description": "Conducted technical interviews and played a crucial role in expanding the development team and managing internship programs. Served as a member of the R&D Team, providing custom Microsoft CRM solutions for clients, such as work time management/scheduling tools and HR portals.",
			"experience.api.date": "Jul, 2012<br>Dec, 2015",
			"experience.api.role": "Software developer",
			"experience.api.description": "Contributed to a German startup focused on developing a unique car diagnostic system. Worked on multiple subsystems within the project, including a web application that presented diagnostic results to customers in an easily digestible format.",
			"experience.digital.date": "Jan, 2009<br>Jul, 2012",
			"experience.digital.role": "Web developer intern",
			"experience.digital.description": "During my college years, I designed and implemented user-friendly websites for clients in collaboration with a UI designer. Gained valuable experience in web development and honed my skills in creating visually appealing and functional digital solutions.",
			"education.heading": "Education & Diplomas",
			"education.lead": "What I have done in my academic career",
			"education.degree": "Computer Engineering, B.Sc.",
			"education.school": "Budapest University of Technology and Economics",
			"education.description": "I pursued a specialization in Telecommunications and Media Informatics to deepen my understanding of computer networking and security. Although I ultimately chose a career in software development after graduation, the knowledge I gained from my studies has proven invaluable in my professional endeavors.",
			"contact.heading": "Get In Touch",
			"contact.lead": "Please feel free if you would like to have a chat.",
			"contact.details": "Contact details",
			"contact.location": "Budapest XI., Hungary",
			"contact.formHeading": "Send a message!",
			"contact.namePlaceholder": "Your name...",
			"contact.emailPlaceholder": "Your email...",
			"contact.messagePlaceholder": "Your message...",
			"contact.send": "Send message"
		},
		hu: {
			pageTitle: "Kovács Zsolt | Full Stack .NET fejlesztő",
			metaDescription: "Kovács Zsolt - Full Stack .NET fejlesztő több mint 10 év szoftverfejlesztési tapasztalattal, ASP.NET Core, Angular és .NET fókusszal.",
			"hero.title": "Kovács Zsolt",
			"hero.subtitle": "Full Stack .NET fejlesztő",
			"nav.menu": "Menü",
			"nav.home": "Kezdőlap",
			"nav.about": "Rólam",
			"nav.skills": "Skillek",
			"nav.experience": "Tapasztalat",
			"nav.education": "Tanulmányok",
			"nav.contact": "Kapcsolat",
			"about.heading": "Rólam",
			"about.lead": "Rövid bemutatkozás",
			"about.role": "Full Stack .NET fejlesztő",
			"about.paragraph1": "Szenvedélyes fejlesztő vagyok, aki modern, felhasználóbarát és funkciógazdag alkalmazások, valamint weboldalak tervezésére és építésére törekszik naprakész technológiákkal. Több mint 10 év .NET fejlesztői tapasztalattal dolgoztam együtt magyarországi SaaS cégekkel, startupokkal és nagyvállalatokkal több iparágban, többek között könyvelési, biztosítási, autóipari és szolgáltatási területeken.",
			"about.paragraph2": "A fő területem a szoftvertervezés és -fejlesztés, komplex adatbázisok kezelése, kódírás és tesztelés, valamint hibák feltárása és megoldása. Minden projektbe erős elkötelezettséget és professzionális szemléletet viszek, hogy a végeredmény magas minőségű legyen, és illeszkedjen az iparági elvárásokhoz, illetve az ügyféligényekhez.",
			"about.resume": "Nyomtatható önéletrajz letöltése",
			"skills.heading": "Technikai skillek",
			"skills.lead": "Ezekben egészen otthon vagyok",
			"skills.vibeTitle": "VIBE CODING",
			"skills.vibeTools": "Codex, Claude, Cursor",
			"skills.databases": "Adatbázisok",
			"skills.devops": "Cloud és DevOps",
			"skills.messaging": "NoSQL és üzenetkezelés",
			"experience.heading": "Szakmai tapasztalat",
			"experience.lead": "Korábbi együttműködéseim",
			"experience.mi.date": "2024. aug.<br>Jelenleg",
			"experience.mi.role": "Lead szoftverfejlesztő",
			"experience.mi.description": "Egy ASP.NET Core és Angular alapú vállalatirányítási platformot fejlesztő csapatot vezettem. A nagy terhelésű rendszer Redis és RabbitMQ (MassTransit) technológiákat is használt, ahol a biztonság és a magas rendelkezésre állás kiemelten fontos volt.",
			"experience.cmg.date": "2018. ápr.<br>2024. aug.",
			"experience.cmg.role": "Senior szoftverfejlesztő",
			"experience.cmg.description": "Több céges projekt teljes szoftverfejlesztési életciklusát kezeltem. Fejlesztettem egy alkalmazást, amely biztosítási alkuszok számára egyszerűsítette a kötvények és szerződések rendszerezését. Csapatban dolgoztam olyan faktoring szoftveren is, amely közvetlen kapcsolatot biztosított nagy biztosítótársaságokkal.",
			"experience.xapt.date": "2015. dec.<br>2018. ápr.",
			"experience.xapt.role": "Lead szoftverfejlesztő",
			"experience.xapt.description": "Technikai interjúkat vezettem, fontos szerepet vállaltam a fejlesztői csapat bővítésében és gyakornoki programok támogatásában. Az R&D csapat tagjaként egyedi Microsoft CRM megoldásokat készítettem ügyfeleknek, például munkaidő-kezelő, ütemező eszközöket és HR portálokat.",
			"experience.api.date": "2012. júl.<br>2015. dec.",
			"experience.api.role": "Szoftverfejlesztő",
			"experience.api.description": "Egy német startupnál dolgoztam, amely egy egyedi autódiagnosztikai rendszert fejlesztett. A projekt több alrendszerében is részt vettem, köztük egy webalkalmazásban, amely az ügyfelek számára könnyen érthető formában jelenítette meg a diagnosztikai eredményeket.",
			"experience.digital.date": "2009. jan.<br>2012. júl.",
			"experience.digital.role": "Webfejlesztő gyakornok",
			"experience.digital.description": "Főiskolai éveim alatt felhasználóbarát weboldalakat terveztem és valósítottam meg ügyfeleknek egy UI designerrel együttműködve. Értékes webfejlesztési tapasztalatot szereztem, és sokat fejlődtem vizuálisan igényes, jól működő digitális megoldások készítésében.",
			"education.heading": "Tanulmányok és diplomák",
			"education.lead": "Amit a tanulmányaim során végeztem",
			"education.degree": "Mérnökinformatikus, B.Sc.",
			"education.school": "Budapesti Műszaki és Gazdaságtudományi Egyetem",
			"education.description": "Telekommunikáció és médiainformatika szakirányon tanultam, hogy mélyebb tudást szerezzek számítógépes hálózatokról és biztonságról. Bár diploma után végül a szoftverfejlesztést választottam hivatásként, az ott megszerzett tudás a mai napig hasznos a szakmai munkámban.",
			"contact.heading": "Kapcsolat",
			"contact.lead": "Keress bátran, ha beszélgetnél.",
			"contact.details": "Elérhetőségek",
			"contact.location": "Budapest XI., Magyarország",
			"contact.formHeading": "Üzenet küldése",
			"contact.namePlaceholder": "Neved...",
			"contact.emailPlaceholder": "E-mail címed...",
			"contact.messagePlaceholder": "Üzeneted...",
			"contact.send": "Üzenet küldése"
		}
	};

	function getLanguage() {
		var savedLanguage = window.localStorage && window.localStorage.getItem("cvLanguage");
		return translations[savedLanguage] ? savedLanguage : "en";
	}

	function setLanguage(language) {
		var dictionary = translations[language] || translations.en;
		document.documentElement.lang = language;
		document.title = dictionary.pageTitle;

		var metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) {
			metaDescription.setAttribute("content", dictionary.metaDescription);
		}

		Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (element) {
			var key = element.getAttribute("data-i18n");
			if (dictionary[key]) {
				element.textContent = dictionary[key];
			}
		});

		Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-html]"), function (element) {
			var key = element.getAttribute("data-i18n-html");
			if (dictionary[key]) {
				element.innerHTML = dictionary[key];
			}
		});

		Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-placeholder]"), function (element) {
			var key = element.getAttribute("data-i18n-placeholder");
			if (dictionary[key]) {
				element.setAttribute("placeholder", dictionary[key]);
			}
		});

		Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-value]"), function (element) {
			var key = element.getAttribute("data-i18n-value");
			if (dictionary[key]) {
				element.setAttribute("value", dictionary[key]);
			}
		});

		Array.prototype.forEach.call(document.querySelectorAll("[data-language]"), function (button) {
			button.className = button.getAttribute("data-language") === language ? "active" : "";
		});

		if (window.localStorage) {
			window.localStorage.setItem("cvLanguage", language);
		}
	}

	document.addEventListener("DOMContentLoaded", function () {
		setLanguage(getLanguage());

		Array.prototype.forEach.call(document.querySelectorAll("[data-language]"), function (button) {
			button.addEventListener("click", function () {
				setLanguage(button.getAttribute("data-language"));
			});
		});
	});
}());
