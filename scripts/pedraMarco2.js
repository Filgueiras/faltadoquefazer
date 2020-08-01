	//constantes
	var ESPERAINICIAL = 60;
	var CARENCIAINICIAL = 3;
	
	//Inicializando variaveis
	var seuNome;
	var contaCarencia = 0;
	var timerId = 0;
	var sPedraAnimo = 'tristonha';
	var timerLoop = setInterval("atualizarCampos()", 1 * 1000);
	var contaCarinho = 0;
	var nSegundosEspera = ESPERAINICIAL;
	var nCarencia = CARENCIAINICIAL;
	var bCookieAcao = navigator.cookieEnabled;
	var bCookieLido = navigator.cookieEnabled;
	
	var eixoXtela = 800;
	var eixoYtela = 600;
	var sSystem = navigator.platform;

	//callback !!!
	window.onresize=redimensionaPedra;
	
	window.onload = function() {
		inicializaPedra();

		document.getElementById("rockImg").onclick = function(evt){cutucaPedra();};
		document.getElementById("espera").onchange = function(evt){setTempoBase();};
		document.getElementById("limiteBrava").onchange = function(evt){setLimiteCarencia();};
		document.getElementById("esquecer").onclick= function(evt){ esquecerDeMim();};
	};
	
	//função para tentar usar DOM...
	function insereTextoNodeDom(sNomeId, sNovoTexto, sTipoElemento){
		var nodeDom = document.getElementById( sNomeId);
		
		if (sTipoElemento != "input"){
			while (nodeDom.firstChild){
				nodeDom.removeChild(nodeDom.firstChild);
			}
			nodeDom.appendChild(document.createTextNode(sNovoTexto));
		} else{
			nodeDom.value = sNovoTexto;
		}
	}
	
	//sobre o dispositivo
	function aboutGadget(opcao){
		switch(opcao){
		case 1: return navigator.appName;
		case 2: return navigator.appCodeName;
		case 3: return navigator.appVersion;
		case 4: return navigator.cookieEnabled;
		case 5: return navigator.platform ;
		defaul: return null;
		}
	}
	
	// funções da página
	function gravarCookie(nome, valor, dias){
		var expira="";
		
		if (dias){
			var data = new Date();
			data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
			expira = "; expira=" + data.toGMTString();
		}
		
		document.cookie = nome + "=" + valor + expira + "; path=/";
	}
	
	function lerCookie(nome){
		var nomeBusca = nome + "=";
		var cookies = document.cookie.split(';');
		
		for(var i=0; i < cookies.lenght; i++){
			var c = cookies[i];
			while (c.charAt(0)=='')
				c = c.substring(1,c.lenght);
			if (c.indexOf(nomeBusca)==0)
				return c.substring(nomeBusca.lenght,c.lenght);
		}
		return null;
	}
	
	function apagarCookie(nome){
		gravarCookie(nome,"",-1);
	}
	
	function inicializaPedra(){
		sTexto = "Olá, eu posso ser sua rocha de estimação?\nClique em mim pra eu ficar feliz !";
		//nIdDiv = document.getElementById("adotado");
		
		redimensionaPedra();
		tempo = (nSegundosEspera * 2) * 1 * 1000;
		
		insereTextoNodeDom("mensagem", sTexto, "texto");
		//document.getElementById("mensagem").innerHTML = sTexto;
		mostrarData();
		timerId = setTimeout("ficouAbandonada()", tempo);
		
		insereTextoNodeDom("espera", ESPERAINICIAL, "input");
		insereTextoNodeDom("limiteBrava", CARENCIAINICIAL, "input");
		/*
		if (bCookieLido) {
			document.getElementById("podeCookieS").checked="checked";
		} else {
			document.getElementById("podeCookieN").checked="checked";
		}*/
	}

	function mostrarData() {
		var sData;
		var dData = new Date();
	
		sData = acertaString(dData.getDate()) + "/" + acertaString(dData.getMonth()) + "/" + dData.getFullYear()
		sData += " " + acertaString(dData.getHours()) + ":" + acertaString(dData.getMinutes()) + ":" + acertaString(dData.getSeconds())

		insereTextoNodeDom("evento", sData, "input");
	}
	
	function cutucaPedra(){
		clearTimeout(timerId);
		sTexto= "lá, lá, lá...";
		
		if (contaCarinho == 0){
			if (seuNome){
				sTexto="Poxa, " + seuNome + "! Precisa fazer cafuné em mim !\nAí sim !!!";
			}
			else {
				seuNome = prompt( "Qual é o seu nome ?", "Escreva seu nome aqui...");
				if (seuNome!="Escreva seu nome aqui..." && seuNome != "" && seuNome != null){
					sTexto = "Olá, " + seuNome + "!\n\rEu estava sozinha na Web, agora não estou mais...";
					alteraCookie(2);
				} else{
					sTexto = "Você precisa me dizer seu nome...\nComo eu vou te chamar assim ? Mas ok, desta vez passa...";
					seuNome="";
				}
			}
		} 
		contaCarinho +=1;
		insereTextoNodeDom("mensagem", sTexto, "texto");
		//document.getElementById("mensagem").innerHTML = sTexto;	
		mostrarData();
		ficouFeliz();
	}
	
	function esquecerDeMim(){
		clearTimeout(timerId);
		alteraCookie(-1);
		sTexto="...";
		
		if (seuNome){
			sTexto = 'Adeus, ' + seuNome + '.\nEu sei que ninguem gosta de mim...';
			seuNome="";
			contaCarencia = 0;
			ficouBrava();
		} else {
			sTexto = 'Adeus, desconhecido.\nEu sei que ninguem gosta de mim...';
			ficouInfeliz();
		}
		contaCarinho = 0;
		nSegundosEspera = ESPERAINICIAL;
		nCarencia = CARENCIAINICIAL;
		
		//document.getElementById("espera").value = ESPERAINICIAL;
		//document.getElementById("limiteBrava").value = CARENCIAINICIAL;
		//document.getElementById("mensagem").innerHTML = sTexto;
		
		insereTextoNodeDom("espera", ESPERAINICIAL, "input");
		insereTextoNodeDom("limiteBrava", CARENCIAINICIAL, "input");
		insereTextoNodeDom("mensagem", sTexto, "texto");
	}
	
	function ficouCarente(){
		sTexto="...";
		
		if (contaCarencia == nCarencia) {
			ficouBrava();
			contaCarencia=0;
			return;
		}
		
		if (seuNome){
			contaCarencia += 1;
			sTexto = seuNome + ", você me abandonou ? ("+contaCarencia+")";
			ficouTristonha();
		} else{
			contaCarencia += 1;
			sTexto = "Eu sei que tem alguem aí...\nFaz um cafuné clicando em mim!";
			ficouTristonha();
		}
		//document.getElementById("mensagem").innerHTML = sTexto;
		insereTextoNodeDom("mensagem", sTexto, "texto");
	}
	
	function ficouBrava(){
		//timerId = 0;
		tempo = nSegundosEspera * 1 * 1000;
		
		document.getElementById("rockImg").src = "../img/rockAlpha_brava.png";
		sPedraAnimo="brava";
		mostrarData();
		timerId = setTimeout("ficouInfeliz()", tempo);
		contaCarinho = 0;
		//document.getElementById("mensagem").innerHTML = "...";
		insereTextoNodeDom("mensagem", "...", "texto");
	}
	
	function ficouAbandonada(){
		//timerId = 0;
		tempo = nSegundosEspera * 1 * 1000;
		sTexto = "...";
		
		document.getElementById("rockImg").src = "../img/rockAlpha_sad.png";
		sPedraAnimo="arrasada";
		sTexto = "Ei... Pra que você veio aqui?!";
		timerId = setTimeout("ficouCarente()", tempo);
		insereTextoNodeDom("mensagem", sTexto, "texto");
		//document.getElementById("mensagem").innerHTML = sTexto;
		mostrarData();
		contaCarinho = 0;
	}
	
	function ficouInfeliz(){
		//timerId = 0;
		tempo = nSegundosEspera * 1 * 1000;
		
		mostrarData();
		document.getElementById("rockImg").src = "../img/rockAlpha_sad.png";
		sPedraAnimo = "infeliz";
		mostrarData();
		timerId = setTimeout("ficouCarente()", tempo);
		contaCarinho = 0;
	}
	
	function ficouTristonha(){
		//timerId = 0;
		tempo = nSegundosEspera * 1 * 1000;
		
		document.getElementById("rockImg").src = "../img/rockAlpha.png";
		sPedraAnimo="tristonha";
		mostrarData();
		timerId = setTimeout("ficouCarente()", tempo);
		contaCarinho = 0;
	}

	function ficouFeliz(){
		var nMulti = contaCarinho * nSegundosEspera * 1000;
		//timerId = 0;
		document.getElementById("rockImg").src = "../img/rockAlpha_happy.png";
		sPedraAnimo="feliz";
		mostrarData();
		timerId = setTimeout("ficouCarente()", nMulti);
	}
	
	function atualizarCampos(){
		var sNomeFunc = '???';
		var dData = new Date();
		var sData = '';
		
		if (seuNome){
			sNomeFunc = seuNome;
		}
		
		sData = acertaString(dData.getHours());
		sData += ":" + acertaString(dData.getMinutes());
		sData += ":" + acertaString(dData.getSeconds());
		
		//document.getElementById("contador").value = sData;
		//document.getElementById("nomeDono").value = sNomeFunc;
		//document.getElementById("humor").value = sPedraAnimo;
		//document.getElementById("cafune").value = contaCarinho;
		//document.getElementById("carencia").value = contaCarencia;
		
		insereTextoNodeDom("contador", sData, "input");
		insereTextoNodeDom("nomeDono", sNomeFunc, "input");
		insereTextoNodeDom("humor", sPedraAnimo, "input");
		insereTextoNodeDom("cafune", contaCarinho, "input");
		insereTextoNodeDom("carencia", contaCarencia, "input");
	}
	
	function acertaString(nAcertar){
		sAcertar = '';
		
		if (nAcertar<10){
			sAcertar="0" + nAcertar;
		} else{
			sAcertar = nAcertar;
		}
		return sAcertar;
	}

	function setTempoBase(){

		if (isNaN(document.getElementById("espera").value)){
			nSegundosEspera = ESPERAINICIAL;
			alert("Você não usou um número... Tente novamente...");
			insereTextoNodeDom("espera",nSegundosEspera,"input");
			//document.getElementById("espera").value = nSegundosEspera;
		} else
		{
			nSegundosEspera = document.getElementById("espera").value;
		}
	}
		
	function setLimiteCarencia(){

		if (isNaN(document.getElementById("limiteBrava").value)){
			nCarencia = CARENCIAINICIAL;
			alert("Você não usou um número... Tente novamente...");
			//document.getElementById("limiteBrava").value = nCarencia;
			insereTextoNodeDom("limiteBrava",nCarencia,"input");
		} else
		{
			if (contaCarencia<document.getElementById("limiteBrava").value){
				nCarencia = document.getElementById("limiteBrava").value;
			} else{
				alert("A carência da pedra precisa ser maior que a atual...\nDeixaremos em "+(contaCarencia + 1)+", ok?");
				nCarencia = contaCarencia + 1;
				//document.getElementById("limiteBrava").value = nCarencia;			
				insereTextoNodeDom("limiteBrava",nCarencia,"input");
			}
		}
	}
	
	function redimensionaPedra(){
		
		eixoXtela = document.body.clientWidth;
		eixoYtela = document.body.clientHeight;
		tamStyle = 0;

		var nAlturaJanela = (eixoYtela - 200)*0.7;
		//document.getElementById("rockImg").height = nAlturaJanela;
		document.getElementById("rockImg").width = eixoXtela - 700;
		//tamStyle = document.getElementById("adotado").width;
		//alert(tamStyle);

	}
	
	function alteraCookie(bLigado){
	/*
		if (bCookieLido) {
			if (bLigado==1 || bLigado == 2){
				document.getElementById("podeCookieS").checked="checked";
				if (bLigado == 1){
					alert("Sua pedra lembrará de você até que você desista dela...");
				}
				bCookieAcao = 1;
			}
			else if (bLigado==0){
				document.getElementById("podeCookieN").checked="checked";
				alert("Sua pedra não lembrará de você quando esta página fechar.\nTudo bem, ela é só uma vira-latas mesmo...");
				bCookieAcao = 0;				
			} else{ //para o -1, que é o 0 
				document.getElementById("podeCookieN").checked="checked";
				bCookieAcao = 0;			
			}
		} else {
			alert("Seu browser não está permitindo gravação de cookies.\nSua pedra não lembrará de você mais tarde.");
			document.getElementById("podeCookieS").checked="checked";
			bCookieAcao = bCookieLido;
		}
	*/
	return;
	}