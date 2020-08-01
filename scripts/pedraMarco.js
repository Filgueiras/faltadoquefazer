	//constantes
	var ESPERAINICIAL = 30;
	var CARENCIAINICIAL = 5;
	
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

	//callback !!!
	window.onload = function() {
		inicializaPedra();
		
		window.onresize=redimensionaPedra;
		document.getElementById("rockImg").onclick = function(evt){cutucaPedra();};
		document.getElementById("espera").onchange = function(evt){setTempoBase();};
		document.getElementById("limiteBrava").onchange = function(evt){setLimiteCarencia();};
		document.getElementById("esquecer").onclick= function(evt){ esquecerDeMim();};
	};
	
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
		redimensionaPedra();
		tempo = (nSegundosEspera * 2) * 1 * 1000;
		alert('Olá, eu posso ser sua rocha de estimação?\nClique em mim pra eu ficar feliz !');
		mostrarData();
		timerId = setTimeout("ficouAbandonada()", tempo);
		
		document.getElementById("espera").value = ESPERAINICIAL;
		document.getElementById("limiteBrava").value = CARENCIAINICIAL;
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

		document.getElementById("evento").value=sData;
	}
	
	function cutucaPedra(){
		clearTimeout(timerId);
		
		if (contaCarinho == 0){
			if (seuNome){
				alert("Poxa, " + seuNome + "! Precisa fazer cafuné em mim !\nAí sim !!!");
			}
			else {
				seuNome = prompt( "Qual é o seu nome ?", "Escreva seu nome aqui...");
				if (seuNome!="Escreva seu nome aqui..." && seuNome != "" && seuNome != null){
					alert("Olá, " + seuNome + "!\nEu estava sozinha na Web, agora não estou mais...");
					alteraCookie(2);
				} else{
					alert("Você precisa me dizer seu nome...\nComo eu vou te chamar assim ? Mas ok, desta vez passa...");
					seuNome="";
				}
			}
		} 
		contaCarinho +=1;
		
		mostrarData();
		ficouFeliz();
	}
	
	function esquecerDeMim(){
		clearTimeout(timerId);
		alteraCookie(-1);
		if (seuNome){
			alert('Adeus, ' + seuNome + '.\nEu sei que ninguem gosta de mim...');
			seuNome="";
			contaCarencia = 0;
			ficouBrava();
		} else {
			alert('Adeus, desconhecido.\nEu sei que ninguem gosta de mim...');	
			ficouInfeliz();
		}
		contaCarinho = 0;
		nSegundosEspera = ESPERAINICIAL;
		nCarencia = CARENCIAINICIAL;
		document.getElementById("espera").value = ESPERAINICIAL;
		document.getElementById("limiteBrava").value = CARENCIAINICIAL;
	}
	
	function ficouCarente(){
	
		if (contaCarencia == nCarencia) {
			ficouBrava();
			contaCarencia=0;
			return;
		}
		
		if (seuNome){
			contaCarencia += 1;
			alert(seuNome + "! Você me abandonou ? ("+contaCarencia+")");
			ficouTristonha();
		} else{
			contaCarencia += 1;
			alert("Eu sei que tem alguem aí...\nFaz um cafuné clicando em mim ! ("+contaCarencia+")");
			ficouTristonha();
		}

	}
	
	function ficouBrava(){
		//timerId = 0;
		tempo = nSegundosEspera * 1 * 1000;
		
		document.getElementById("rockImg").src = "../img/rockAlpha_brava.png";
		sPedraAnimo="brava";
		mostrarData();
		timerId = setTimeout("ficouInfeliz()", tempo);
		contaCarinho = 0;
	}
	
	function ficouAbandonada(){
		//timerId = 0;
		tempo = nSegundosEspera * 1 * 1000;
		
		document.getElementById("rockImg").src = "../img/rockAlpha_sad.png";
		sPedraAnimo="arrasada";
		alert("Ei! Pra que você veio aqui?!");
		timerId = setTimeout("ficouCarente()", tempo);
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
		
		document.getElementById("contador").value = sData;
		document.getElementById("nomeDono").value = sNomeFunc;
		document.getElementById("humor").value = sPedraAnimo;
		document.getElementById("cafune").value = contaCarinho;
		document.getElementById("carencia").value = contaCarencia;
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
			document.getElementById("espera").value = nSegundosEspera;
		} else
		{
			nSegundosEspera = document.getElementById("espera").value;
		}
	}
		
	function setLimiteCarencia(){

		if (isNaN(document.getElementById("limiteBrava").value)){
			nCarencia = CARENCIAINICIAL;
			alert("Você não usou um número... Tente novamente...");
			document.getElementById("limiteBrava").value = nCarencia;
		} else
		{
			if (contaCarencia<document.getElementById("limiteBrava").value){
				nCarencia = document.getElementById("limiteBrava").value;
			} else{
				alert("A carência da pedra precisa ser maior que a atual...\nDeixaremos em "+(contaCarencia + 1)+", ok?");
				nCarencia = contaCarencia + 1;
				document.getElementById("limiteBrava").value = nCarencia;			
			}
		}
	}
	
	function redimensionaPedra(){
		
		eixoXtela = document.body.clientWidth;
		eixoYtela = document.body.clientHeight;
		
		var nAlturaJanela = (eixoYtela - 200)*0.7;
		document.getElementById("rockImg").style.height = nAlturaJanela;
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
		}*/
	return;
	}