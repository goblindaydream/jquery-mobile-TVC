//------------------------------------------------------------------------------
// Modification History
//
// Date        Developer            Modification 
// ---------   ------------------   --------------------------------------------
// 03/20/2002  Scott E. Maier       Added this block of code to detect browser
//                                  type.
//==============================================================================

// JavaScript Browser Sniffer
// Eric Krok, Andy King, Michel Plungjan Jan. 31, 2002
// see http://www.webreference.com/ for more information
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
// please send any improvements to aking@internet.com and we'll
// roll the best ones in
//
// adapted from Netscape's Ultimate client-side JavaScript client sniffer
// and andy king's sniffer
// Revised May 7 99 to add is.nav5up and is.ie5up (see below). (see below).
// Revised June 11 99 to add additional props, checks
// Revised June 23 99 added screen props - gecko m6 doesn't support yet - abk
//                    converted to var is_ from is object to work everywhere
// 990624 - added cookie forms links frames checks - abk
// 001031 - ie4 mod 5.0 -> 5. (ie5.5 mididentified - abk)
//          is_ie4 mod tp work with ie6+ - abk
// 001120 - ns6 released, document.layers false, put back in
//        - is_nav6 test added - abk
// 001121 - ns6+ added, used document.getElementById, better test, dom-compl
// 010117 - actual version for ie3-5.5 by Michel Plungjan
// 010118 - actual version for ns6 by Michel Plungjan
// 010217 - netscape 6/mz 6 ie5.5 onload defer bug docs - abk
// 011107 - added is_ie6 and is_ie6up variables - dmr
// 020128 - added link to netscape's sniffer, on which this is based - abk
//          updated sniffer for aol4-6, ie5mac = js1.4, TVNavigator, AOLTV,
//          hotjava
// 020131 - cleaned up links, added more links to example object detection
// 020131 - a couple small problems with Opera detection. First, when Opera
//          is set to be compatible with other browsers it will contain their
//          information in the userAgent strings. Thus, to be sure we have 
//          Opera we should check for it before checking for the other bigs.
//          (And make sure the others are !opera.) Also corrected a minor
//          bug in the is_opera6up assignment.
//
// Everything you always wanted to know about your JavaScript client
// but were afraid to ask. Creates "is_" variables indicating:
// (1) browser vendor:
//     is_nav, is_ie, is_opera
// (2) browser version number:
//     is_major (integer indicating major version number: 2, 3, 4 ...)
//     is_minor (float   indicating full  version number: 2.02, 3.01, 4.04 ...)
// (3) browser vendor AND major version number
//     is_nav2, is_nav3, is_nav4, is_nav4up, is_nav5, is_nav5up, 
//     is_nav6, is_nav6up, is_ie3, is_ie4, is_ie4up, is_ie5up, is_ie6...
// (4) JavaScript version number:
//     is_js (float indicating full JavaScript version number: 1, 1.1, 1.2 ...)
// (5) OS platform and version:
//     is_win, is_win16, is_win32, is_win31, is_win95, is_winnt, is_win98
//     is_os2
//     is_mac, is_mac68k, is_macppc
//     is_unix
//        is_sun, is_sun4, is_sun5, is_suni86
//        is_irix, is_irix5, is_irix6
//        is_hpux, is_hpux9, is_hpux10
//        is_aix, is_aix1, is_aix2, is_aix3, is_aix4
//        is_linux, is_sco, is_unixware, is_mpras, is_reliant
//        is_dec, is_sinix, is_freebsd, is_bsd
//     is_vms
//
// based in part on 
// http://www.mozilla.org/docs/web-developer/sniffer/browser_type.html
// The Ultimate JavaScript Client Sniffer
// and Andy King's object detection sniffer
//
// Note: you don't want your Nav4 or IE4 code to "turn off" or
// stop working when Nav5 and IE5 (or later) are released, so
// in conditional code forks, use is_nav4up ("Nav4 or greater")
// and is_ie4up ("IE4 or greater") instead of is_nav4 or is_ie4
// to check version in code which you want to work on future
// versions. For DOM tests scripters commonly used the 
// is_getElementById test, but make sure you test your code as
// filter non-compliant browsers (Opera 5-6 for example) as some 
// browsers return true for this test, and don't fully support
// the W3C's DOM1.
//

    // convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();
    var appVer = navigator.appVersion.toLowerCase();

    // *** BROWSER VERSION ***

    var is_minor = parseFloat(appVer);
    var is_major = parseInt(is_minor);

    // Note: On IE, start of appVersion return 3 or 4
    // which supposedly is the version of Netscape it is compatible with.
    // So we look for the real version further on in the string

    var iePos  = appVer.indexOf('msie');
    if (iePos !=-1) {
       is_minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)))
       is_major = parseInt(is_minor);
    }

    // Netscape6 is mozilla/5 + Netscape6/6.0!!!
    // Mozilla/5.0 (Windows; U; Win98; en-US; m18) Gecko/20001108 Netscape6/6.0
    var nav6Pos = agt.indexOf('netscape6');
    if (nav6Pos !=-1) {
       is_minor = parseFloat(agt.substring(nav6Pos+10))
       is_major = parseInt(is_minor)
    }

    var is_getElementById   = (document.getElementById) ? "true" : "false"; // 001121-abk
    var is_getElementsByTagName = (document.getElementsByTagName) ? "true" : "false"; // 001127-abk
    var is_documentElement = (document.documentElement) ? "true" : "false"; // 001121-abk

    var is_opera = (agt.indexOf("opera") != -1);
    var is_opera2 = (agt.indexOf("opera 2") != -1 || agt.indexOf("opera/2") != -1);
    var is_opera3 = (agt.indexOf("opera 3") != -1 || agt.indexOf("opera/3") != -1);
    var is_opera4 = (agt.indexOf("opera 4") != -1 || agt.indexOf("opera/4") != -1);
    var is_opera5 = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1);
    var is_opera6 = (agt.indexOf("opera 6") != -1 || agt.indexOf("opera/6") != -1); // new 020128- abk
    var is_opera5up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4);
    var is_opera6up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4 && !is_opera5); // new020128

    var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    var is_nav2 = (is_nav && (is_major == 2));
    var is_nav3 = (is_nav && (is_major == 3));
    var is_nav4 = (is_nav && (is_major == 4));
    var is_nav4up = (is_nav && is_minor >= 4);  // changed to is_minor for
                                                // consistency - dmr, 011001
    var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) ||
                          (agt.indexOf("; nav") != -1)) );

    var is_nav6   = (is_nav && is_major==6);    // new 010118 mhp
    var is_nav6up = (is_nav && is_minor >= 6) // new 010118 mhp

    var is_nav5   = (is_nav && is_major == 5 && !is_nav6); // checked for ns6
    var is_nav5up = (is_nav && is_minor >= 5);

    var is_ie   = ((iePos!=-1) && (!is_opera));
    var is_ie3  = (is_ie && (is_major < 4));

    var is_ie4   = (is_ie && is_major == 4);
    var is_ie4up = (is_ie && is_minor >= 4);
    var is_ie5   = (is_ie && is_major == 5);
    var is_ie5up = (is_ie && is_minor >= 5);
    
    var is_ie5_5  = (is_ie && (agt.indexOf("msie 5.5") !=-1)); // 020128 new - abk
    var is_ie5_5up =(is_ie && is_minor >= 5.5);                // 020128 new - abk
	
    var is_ie6   = (is_ie && is_major == 6);
    var is_ie6up = (is_ie && is_minor >= 6);

// KNOWN BUG: On AOL4, returns false if IE3 is embedded browser
    // or if this is the first browser window opened.  Thus the
    // variables is_aol, is_aol3, and is_aol4 aren't 100% reliable.

    var is_aol   = (agt.indexOf("aol") != -1);
    var is_aol3  = (is_aol && is_ie3);
    var is_aol4  = (is_aol && is_ie4);
    var is_aol5  = (agt.indexOf("aol 5") != -1);
    var is_aol6  = (agt.indexOf("aol 6") != -1);

    var is_webtv = (agt.indexOf("webtv") != -1);
    
    // new 020128 - abk
    
    var is_TVNavigator = ((agt.indexOf("navio") != -1) || (agt.indexOf("navio_aoltv") != -1)); 
    var is_AOLTV = is_TVNavigator;

    var is_hotjava = (agt.indexOf("hotjava") != -1);
    var is_hotjava3 = (is_hotjava && (is_major == 3));
    var is_hotjava3up = (is_hotjava && (is_major >= 3));

    // end new
	
    // *** JAVASCRIPT VERSION CHECK ***
    // Useful to workaround Nav3 bug in which Nav3
    // updated 020131 by dragle
    var is_js;
    if (is_nav2 || is_ie3) is_js = 1.0;
    else if (is_nav3) is_js = 1.1;
    else if (is_opera6up) is_js = 1.4; // new 1.4? 020128 - abk
    else if (is_opera5) is_js = 1.3;
    else if (is_opera) is_js = 1.1;
    else if ((is_nav4 && (is_minor <= 4.05)) || is_ie4) is_js = 1.2;
    else if ((is_nav4 && (is_minor > 4.05)) || is_ie5) is_js = 1.3;
    else if (is_nav5 && !(is_nav6)) is_js = 1.4;
    else if (is_hotjava3up) is_js = 1.4; // new 020128 - abk
    else if (is_nav6) is_js = 1.5;

    // NOTE: In the future, update this code when newer versions of JS
    // are released. For now, we try to provide some upward compatibility
    // so that future versions of Nav and IE will show they are at
    // *least* JS 1.x capable. Always check for JS version compatibility
    // with > or >=.

    else if (is_nav && (is_major > 5)) is_js = 1.4
    else if (is_ie && (is_major > 5)) is_js = 1.3
    
    // what about ie6 and ie6up for js version? abk
    
    // HACK: no idea for other browsers; always check for JS version 
    // with > or >=
    else is_js = 0.0;
	// HACK FOR IE5 MAC = js vers = 1.4 (if put inside if/else jumps out at 1.3)
    if ((agt.indexOf("mac")!=-1) && is_ie5up) is_js = 1.4; // 020128 - abk
    
    // *** PLATFORM ***
    var is_win   = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
    // NOTE: On Opera 3.0, the userAgent string includes "Windows 95/NT4" on all
    //        Win32, so you can't distinguish between Win95 and WinNT.
    var is_win95 = ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));

    // is this a 16 bit compiled version?
    var is_win16 = ((agt.indexOf("win16")!=-1) ||
               (agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1) ||
               (agt.indexOf("windows 16-bit")!=-1) );

    var is_win31 = ((agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) ||
                    (agt.indexOf("windows 16-bit")!=-1));
	
	var is_winme = ((agt.indexOf("win 9x 4.90")!=-1));    // new 020128 - abk
    var is_win2k = ((agt.indexOf("windows nt 5.0")!=-1)); // new 020128 - abk

    // NOTE: Reliable detection of Win98 may not be possible. It appears that:
    //       - On Nav 4.x and before you'll get plain "Windows" in userAgent.
    //       - On Mercury client, the 32-bit version will return "Win98", but
    //         the 16-bit version running on Win98 will still return "Win95".
    var is_win98 = ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
    var is_winnt = ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
    var is_win32 = (is_win95 || is_winnt || is_win98 ||
                    ((is_major >= 4) && (navigator.platform == "Win32")) ||
                    (agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));

    var is_os2   = ((agt.indexOf("os/2")!=-1) ||
                    (navigator.appVersion.indexOf("OS/2")!=-1) ||
                    (agt.indexOf("ibm-webexplorer")!=-1));

    var is_mac    = (agt.indexOf("mac")!=-1);
    var is_mac68k = (is_mac && ((agt.indexOf("68k")!=-1) ||
                               (agt.indexOf("68000")!=-1)));
    var is_macppc = (is_mac && ((agt.indexOf("ppc")!=-1) ||
                                (agt.indexOf("powerpc")!=-1)));

    var is_sun   = (agt.indexOf("sunos")!=-1);
    var is_sun4  = (agt.indexOf("sunos 4")!=-1);
    var is_sun5  = (agt.indexOf("sunos 5")!=-1);
    var is_suni86= (is_sun && (agt.indexOf("i86")!=-1));
    var is_irix  = (agt.indexOf("irix") !=-1);    // SGI
    var is_irix5 = (agt.indexOf("irix 5") !=-1);
    var is_irix6 = ((agt.indexOf("irix 6") !=-1) || (agt.indexOf("irix6") !=-1));
    var is_hpux  = (agt.indexOf("hp-ux")!=-1);
    var is_hpux9 = (is_hpux && (agt.indexOf("09.")!=-1));
    var is_hpux10= (is_hpux && (agt.indexOf("10.")!=-1));
    var is_aix   = (agt.indexOf("aix") !=-1);      // IBM
    var is_aix1  = (agt.indexOf("aix 1") !=-1);
    var is_aix2  = (agt.indexOf("aix 2") !=-1);
    var is_aix3  = (agt.indexOf("aix 3") !=-1);
    var is_aix4  = (agt.indexOf("aix 4") !=-1);
    var is_linux = (agt.indexOf("inux")!=-1);
    var is_sco   = (agt.indexOf("sco")!=-1) || (agt.indexOf("unix_sv")!=-1);
    var is_unixware = (agt.indexOf("unix_system_v")!=-1);
    var is_mpras    = (agt.indexOf("ncr")!=-1);
    var is_reliant  = (agt.indexOf("reliantunix")!=-1);
    var is_dec   = ((agt.indexOf("dec")!=-1) || (agt.indexOf("osf1")!=-1) ||
           (agt.indexOf("dec_alpha")!=-1) || (agt.indexOf("alphaserver")!=-1) ||
           (agt.indexOf("ultrix")!=-1) || (agt.indexOf("alphastation")!=-1));
    var is_sinix = (agt.indexOf("sinix")!=-1);
    var is_freebsd = (agt.indexOf("freebsd")!=-1);
    var is_bsd = (agt.indexOf("bsd")!=-1);
    var is_unix  = ((agt.indexOf("x11")!=-1) || is_sun || is_irix || is_hpux ||
                 is_sco ||is_unixware || is_mpras || is_reliant ||
                 is_dec || is_sinix || is_aix || is_linux || is_bsd || is_freebsd);

    var is_vms   = ((agt.indexOf("vax")!=-1) || (agt.indexOf("openvms")!=-1));
// additional checks, abk
	var is_anchors = (document.anchors) ? "true":"false";
	var is_regexp = (window.RegExp) ? "true":"false";
	var is_option = (window.Option) ? "true":"false";
	var is_all = (document.all) ? "true":"false";
// cookies - 990624 - abk
	document.cookie = "cookies=true";
	var is_cookie = (document.cookie) ? "true" : "false";
	var is_images = (document.images) ? "true":"false";
	var is_layers = (document.layers) ? "true":"false"; // gecko m7 bug?
// new doc obj tests 990624-abk
	var is_forms = (document.forms) ? "true" : "false";
	var is_links = (document.links) ? "true" : "false";
	var is_frames = (window.frames) ? "true" : "false";
	var is_screen = (window.screen) ? "true" : "false";

// java
	var is_java = (navigator.javaEnabled());

// End Browser Sniffer
//==============================================================================

	// Decide browser version
	var ns4 = is_nav4; //(document.layers)? true:false;
	var ns6 = is_nav6; //(document.getElementById)? true:false;
	var ie4 = is_ie4; //(document.all)? true:false;
	var ie5 = is_ie5up; //false;

	// Microsoft Stupidity Check(tm).
	/*if (ie4) {
		if (navigator.userAgent.indexOf('MSIE 5')>0) {
			ie5 = true;
		}
		if (ns6) {
			ns6 = false;
		}
	}*/
	
	function rewriteLayer (layer, html) {
		rewriteLayerWithWidth(layer, html, -1, -1);
	}
	
	function rewriteLayerWithWidth (layer, html, width, height) {
	    document.getElementById(layer).innerHTML = html;
	}  
	
	
	//==============================================================================
	//  Function:  displayPrintVersion
	//------------------------------------------------------------------------------
	/** Description:  Display a printable version.
	**
	**  @param  None
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function displayPrintVersion() {
		console.log("------------displayPrintVersion()---------------");
		
		var u = document.forms['InputForm'].elements['CurrentLengthUnits'].value
		var result = document.getElementById('TankPlot').printVersion(u);
		window.open(result);
	}

	//==============================================================================
	//  Function:  reverseCalc
	//------------------------------------------------------------------------------
	/** Description:  Does a reverse calculation.
	**
	**  @param  flag - flag to get the data.
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function reverseCalc(flag) {
		console.log("------------reverseCalc()---------------");
		
		// Get the data.
		if(flag)
			getData();
		
		// Get the val to calculate with.
	//	var vol = 0;
		var vol = document.getElementById('ReverseV').value;
		var indepVar = document.getElementById('IndependentVariable').options[document.getElementById('IndependentVariable').selectedIndex].value;
		var tankType = document.getElementById('CurrentTankType').value;
		var index = document.ReverseToggleForm.ReverseVolumeList.selectedIndex;
		var u;
		
		var llCalc = false;
		if(indepVar == "liquidLevel")
			llCalc = true;
		
		
		// Convert the value.
		var ft = 0.0005787;
		var gal = .004330;
		var m = 0.00001639;
		var liters = 0.01639;
		if(index == 0)
			vol = vol / ft;
		else if(index == 1)
			vol = vol / gal;
		else if(index == 2)
			vol = vol / m;
		else if(index == 3)
			vol = vol / liters;
				
		// Now get the answer.
		var results = document.getElementById('TankPlot').reverseCalc(vol, tankType, indepVar, index, llCalc);
		if(results == "")
		    alert("Reverse calculation failed.");
		else
		    rewriteLayer('reverseResultsDiv', results);
	}
	
	
	//==============================================================================
	//  Function:  getResults
	//------------------------------------------------------------------------------
	/** Description:  Computes the volume and displays the results.
	**
	**  @param  flag - flag to get the data.
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function getResults( flag, e ) {
		console.log("------------getResults()---------------");
		
		
		var i;
		var characterCode;
		
		// If the enter key was pushed then do nothing. This is needed to fix an issue
		// where pushing the enter key when a dialog box pops up doesn't trigger this code
		// to run again.
		if( e != null ) {
			if( e && e.which ) {
				e = e;
				characterCode = e.which;
			} else {
				e = event;
				characterCode = e.keyCode;
			}
		}

		if(characterCode != 13) {

			// Get the data.
			if(flag)
				getData();
				
			// First, send over the parameters.
			for(i=0; i<document.getElementById('InputForm').elements.length; i++)
			{
				//var junk = document.getElementById('TankPlot').setParameter(document.getElementById('InputForm').elements[i].name, document.getElementById('InputForm').elements[i].value);
				setParameter(document.getElementById('InputForm').elements[i].name, document.getElementById('InputForm').elements[i].value);
			}
			
			// Now compute the volumes.
			//var errmsg = document.getElementById('TankPlot').computeVolumes();
			
			errmsg = computeVolumes();
			
			if(errmsg != "")
			{
				alert(errmsg);
				return;
			}
			
			
			//errmsg = document.getElementById('TankPlot').getLiquidLevelWarning();
			errmsg = getLiquidLevelWarning();
			
			if(errmsg != "")
				alert(errmsg);
			
			// Now generate the output.
			//var out = document.getElementById('TankPlot').generateOutput();
			var out = generateOutput();
	
			var t = '<table><tr><td>' +
					'<table cellspacing=\"3\" cellpadding=\"3\" border=\"2\" bordercolor=\"Black\" bordercolorlight=\"Black\" bordercolordark=\"Black\"><tr><td bgcolor=\"Black\"></td><td>Th<sup>is</sup></td><td><B>is</B></td></tr><tr><td>Spinal</td><td>Tap!</td></tr></table>' +
					'<table><tr><td>' +
					'<form action="doNothing" name="print" id="print">' +
					'<input type=\"button\" name=\"printVersion\" value=\"Display Printable Version\" onClick=\"displayPrintVersion();\">' +
					'</form>' +
					'</td></tr></table>' +
					'</td></tr></table>';
		//	rewriteLayer('Results', t);
			
			//rewriteLayer('Results', out);
			
			//plotTank();
			//reverseCalc(false);
		
		}
	}
	
	var g_Names = ["CurrentTankType", "CylDiameter", "CylLiquidLevel", "CylStraightSide", "CylTopStyle", "CylBottomStyle", "CylTopCone", "CylTopConeUseAngle", "CylTopConeAngle", "CylTopConeUseHeight", "CylTopConeHeight", "CylBottomCone", "CylBottomConeUseAngle", "CylBottomConeAngle", "CylBottomConeUseHeight", "CylBottomConeHeight", "RectWidth", "RectLength", "RectLiquidLevel", "RectStraightSide", "HrzDiameter", "HrzLiquidLevel", "HrzStraightSide", "HrzLeftStyle", "HrzRightStyle", "PrintableURL"];
	var g_Values = [];
	

    var width;
    var height;
    var aspectRatio;
    var pixelSize;
    var xMultiplier;
    var yMultiplier;
    var tankVolFt;
    var tankVolIn;
    var tankVolGal;
    var tankVolLiter;
    var tankVolMeter;
    var liquidVolFt;
    var liquidVolIn;
    var liquidVolGal;
    var liquidVolLiter;
    var liquidVolMeter;
    var liquidLevelWarning;
    var topConeHeight;
    var topConeHeightFlag;
    var topConeAngle;
    var topConeAngleFlag;
    var bottomConeHeight;
    var bottomConeHeightFlag;
    var bottomConeAngle;
    var bottomConeAngleFlag;
    var overallTankHeight;
    var bottomHeight;
    var topHeight;
    var sSide;
    var metric;
    var tWidth;
    var tHeight;
    var ll;
    //var points[][];
    var nPoints;
    var nPointsTank;
    var d;
    var okToPlot;
    var rotate;
    var normalCalc;
    var currentUnits;
    var bg;
	var pi = 3.1415926535897931;
	
	function generateOutput() {
       i = 1;

		document.getElementById("tf").innerHTML = formatNumber(tankVolFt, i);
		document.getElementById("tm").innerHTML = formatNumber(tankVolMeter, i);
		document.getElementById("tg").innerHTML = formatNumber(tankVolGal, i);
		document.getElementById("tl").innerHTML = formatNumber(tankVolLiter, i);
		
		document.getElementById("lf").innerHTML = formatNumber(liquidVolFt, i);
		document.getElementById("lm").innerHTML = formatNumber(liquidVolMeter, i);
		document.getElementById("lg").innerHTML = formatNumber(liquidVolGal, i);
		document.getElementById("ll").innerHTML = formatNumber(liquidVolLiter, i);
		
	  // alert("tankFt = "  + tankVolFt);
	 //  alert("liquidVolFt = "  + liquidVolFt);
	   
    }
	
	function setParameter(s, s1) {
		for (i = 0; i < g_Names.length; i++) {
			if (g_Names[i] == s) {
				g_Values[i] = s1;
			}
		}
	}

	function getParameter(s) {
		for (i = 0; i < g_Names.length; i++) {
			if (g_Names[i] == s) 
				return g_Values[i];
		}
		return "";
	}
	
	
    function computeVolumes() {
        var d4 = 0.0;
        //VolumeCalc volumecalc = new VolumeCalc();
        rotate = false;
        tankVolFt = -1.0;
        tankVolIn = 0.0;
        tankVolGal = -1.0;
        tankVolLiter = -1.0;
        tankVolMeter = -1.0;
        liquidVolFt = -1.0;
        liquidVolIn = 0.0;
        liquidVolGal = -1.0;
        liquidVolLiter = -1.0;
        liquidVolMeter = -1.0;
        liquidLevelWarning = "";
		
        var s = getParameter("CurrentTankType");
		
        if (s == null) 
			return "Failed to get tank type,tankType";
			
        if (s == "Cyl") {
            var flag2 = false;
            var flag = false;
			
            s = getParameter("CylStraightSide");
            if (s == null) 
				return "Failed to get \"Straight Side\",height";
			
            var d5 = extractDouble(s);
            if (d5 == 0.0) 
				return "Straight Side can not be set to 0,height";
				
            s = getParameter("CylLiquidLevel");
            if (s == null) 
				return "Failed to get Liquid Level,liquidLevel";
			
            var d12 = extractDouble(s);
            if (d12 == 0.0) 
				return "Liquid Level can not be set to 0,liquidLevel";
            ll = d12;
            s = getParameter("CylDiameter");
            if (s == null) 
				return "Failed to get Cylindrical Tank Diameter,diameter";
				
            var d8 = extractDouble(s);
            if (d8 == 0.0) return "Diameter can not be set to 0,diameter";
            tWidth = d8;
            s = getParameter("CylBottomStyle");
            var d1;
            if (s  == "0") {
                d1 = 0.0;
                //generateProfile(s, -1, d8, 0.0, 0.0);
            } else if (s == "2") {
                d1 = d8 / 4;
                tankVolIn = computeEllipsoidalVolume(d8, d1);
                liquidVolIn = computeEllipsoidalVolume(d8, d12);
                d12 -= d1;
                //generateProfile(s, -1, d8, 0.0, 0.0);
            } else if (s == "3") {
                d1 = d8 / 2;
                tankVolIn = computeHemisphericalVolume(d8, d1);
                liquidVolIn = computeHemisphericalVolume(d8, d12);
                d12 -= d1;
                //generateProfile(s, -1, d8, 0.0, 0.0);
            } else if (s == "1") {
                d1 = d8 * 0.16666666666666666;
                tankVolIn = computeASMEVolume(d8, d1);
                liquidVolIn = computeASMEVolume(d8, d12);
                d12 -= d1;
                //generateProfile(s, -1, d8, 0.0, 0.0);
            } else if (s == "4") {
                s = getParameter("CylBottomConeHeight");
                if (s == null) 
					return "Failed to get Bottom Cone Height,bottomConeHeight";
                var d19 = extractDouble(s);
                s = getParameter("CylBottomConeAngle");
                if (s == null) 
					return "Failed to get Bottom Cone Angle";
                var d15 = extractDouble(s);
                s = getParameter("CylBottomConeUseAngle");
                if (s == null) 
					return "Failed to get Bottom Cone Angle Use Flag";
                if (s == "Yes") 
					flag = true;
                s = getParameter("CylBottomConeUseHeight");
                if (s == null) 
					return "Failed to get Bottom Cone Height Use Flag";
                if (s == "Yes") flag2 = true;
                if (!flag2 && !flag) 
					return "Bottom cone angle or height must be set.";
                if (flag2 && flag) {
                    var d23 = d8 / 2 / Math.tan((d15 * pi) / 360);
                    if (d19 > d23) 
						return "Invalid bottom cone height for given angle.";
                }
                if (flag2) 
					d1 = d19;
                else 
					d1 = -1; 
				if (!flag) 
					d15 = -1;
				
                if (d1 < 0.0) 
					d1 = d8 / (2 * Math.tan((d15 * pi) / 360));
					
                if (normalCalc) {
                    bottomConeHeightFlag = flag2;
                    bottomConeHeight = d1;
                    bottomConeAngleFlag = flag;
                    if (flag) bottomConeAngle = d15;
                    else bottomConeAngle = (2 * Math.atan(d8 / (2 * d1)) * 180) / pi;
                }
                tankVolIn = computeConicalVolume(d8, d1, d15, -1);
                liquidVolIn = computeConicalVolume(d8, d1, d15, d12);
                d12 -= d1;
                //generateProfile("4", -1, d8, d15, d1);
            } else {
                return "Bad tank bottom style.,bottomShape";
            }
            tHeight = d1;
            if (normalCalc) 
				bottomHeight = d1;
            tankVolIn += computeCylinderVolume(d8, d5);
            if (d12 > 0.0) {
                var d24 = d12;
                if (d24 > d5) d24 = d5;
                liquidVolIn += computeCylinderVolume(d8, d24);
                d12 -= d5;
            }
            if (normalCalc) sSide = d5;
            tHeight += d5;
            flag2 = false;
            flag = false;
            s = getParameter("CylTopStyle");
            if (s == "0") {
                //generateProfile(s, tHeight, d8, 0.0, 0.0);
                d1 = 0.0;
                if (ll > tHeight) 
					liquidLevelWarning = ("Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d1, 1) + ").\nPlease lower the Liquid level.,liquidLevel");
            } else if (s == "2") {
                d1 = d8 / 4;
                var d25 = computeEllipsoidalVolume(d8, d1);
                tankVolIn += d25;
                if (d12 > 0.0) {
                    if (d12 > d1) {
                        d12 = d1;
                        liquidLevelWarning = ("Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d1, 1) + ").\nPlease lower the Liquid level.,liquidLevel");
                    }
                    liquidVolIn += d25 - computeEllipsoidalVolume(d8, d1 - d12);
                }
                //generateProfile(s, tHeight + d1, d8, 0.0, 0.0);
            } else if (s == "3") {
                d1 = d8 / 2;
                var d26 = computeHemisphericalVolume(d8, d1);
                tankVolIn += d26;
                if (d12 > 0.0) {
                    if (d12 > d1) {
                        d12 = d1;
                        liquidLevelWarning = ("Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d1, 1) + ").\nPlease lower the Liquid level.,liquidLevel");
                    }
                    liquidVolIn += d26 - computeHemisphericalVolume(d8, d1 - d12);
                }
                //generateProfile(s, tHeight + d1, d8, 0.0, 0.0);
            } else if (s == "1") {
                d1 = d8 * 0.16666666666666666;
                var d27 = computeASMEVolume(d8, d1);
                tankVolIn += d27;
                if (d12 > 0.0) {
                    if (d12 > d1) {
                        d12 = d1;
                        liquidLevelWarning = ("Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d1, 1) + ").\nPlease lower the Liquid level.,liquidLevel");
                    }
                    liquidVolIn += d27 - computeASMEVolume(d8, d1 - d12);
                }
                //generateProfile(s, tHeight + d1, d8, 0.0, 0.0);
            } else if (s == "4") {
                s = getParameter("CylTopConeHeight");
                if (s == null) 
					return "Failed to get Top Cone Height,topConeHeight";
                var d20 = extractDouble(s);
                s = getParameter("CylTopConeAngle");
                if (s == null) 
					return "Failed to get Top Cone Angle";
                var d16 = extractDouble(s);
                s = getParameter("CylTopConeUseAngle");
                if (s == null) 
					return "Failed to get Top Cone Angle Use Flag";
                if (s == "Yes") 
					flag = true;
                s = getParameter("CylTopConeUseHeight");
                if (s == null) 
					return "Failed to get Top Cone Height Use Flag";
                if (s == "Yes") 
					flag2 = true;
                if (!flag2 && !flag) 
					return "Top cone angle or height must be set.";
                if (flag2 && flag) {
                    var d28 = d8 / 2 / Math.tan((d16 * pi) / 360);
                    if (d20 > d28) return "Invalid top cone height for given angle.";
                }
                if (flag2) 
					d1 = d20;
                else 
					d1 = -1; 
				if (!flag) 
					d16 = -1;
                if (d1 < 0.0) 
					d1 = d8 / (2 * Math.tan((d16 * pi) / 360));
					
                if (normalCalc) {
                    topConeHeightFlag = flag2;
                    topConeHeight = d1;
                    topConeAngleFlag = flag;
                    if (flag) topConeAngle = d16;
                    else topConeAngle = (2 * Math.atan(d8 / (2 * d1)) * 180) / pi;
                }
                var d29 = computeConicalVolume(d8, d1, d16, -1);
                tankVolIn += d29;
                //system.out.println(d1);
                if (d12 > 0.0) {
                    if (d12 > d1) {
                        d12 = d1;
                        liquidLevelWarning = ("Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d1, 1) + ").\nPlease lower the Liquid level.,liquidLevel");
                    }
                    liquidVolIn += d29 - computeConicalVolume(d8, d1, d16, d12);
                }
                //generateProfile("4", tHeight + d1, d8, d16, d1);
            } else {
                return "Bad tank top style.,topShape";
            }
            tHeight += d1;
            if (normalCalc) {
                topHeight = d1;
                overallTankHeight = bottomHeight + sSide + topHeight;
            }
        } else if (s == "Rect") {
            var flag3 = false;
            var flag1 = false;
			
            var s1 = getParameter("RectStraightSide");
			
            if (s1 == null) 
				return "Failed to get \"Straight Side\",height";
				
            var d6 = extractDouble(s1);
            if (d6 == 0.0) 
				return "Straight Side can not be set to 0,height";
				
            s1 = getParameter("RectLiquidLevel");
            if (s1 == null) 
				return "Failed to get Liquid Level,liquidLevel";
				
            var d13 = extractDouble(s1);
			
            if (d13 == 0.0) 
				return "Liquid Level can not be set to 0,liquidLevel";
            ll = d13;
            s1 = getParameter("RectWidth");
            if (s1 == null) 
				return "Failed to get width.,width";
            var d10 = extractDouble(s1);
            if (d10 == 0.0) 
				return "Width can not be set to 0,width";
            s1 = getParameter("RectLength");
            if (s1 == null) 
				return "Failed to get length.,length";
            var d11 = extractDouble(s1);
            if (d11 == 0.0) 
				return "Length can not be set to 0,length";
            s1 = getParameter("CylBottomStyle");
            var d2;
            if (s1 == "0") {
                d2 = 0.0;
                //generateProfile(s1, -1, d10, 0.0, 0.0);
            } else if (s1 == "2") {
                d2 = d10 / 4;
                tankVolIn = computeEllipsoidalVolume(d10, d2);
                liquidVolIn = computeEllipsoidalVolume(d10, d13);
                d13 -= d2;
                //generateProfile(s1, -1, d10, 0.0, 0.0);
            } else if (s1 == "3") {
                d2 = d10 / 2;
                tankVolIn = computeHemisphericalVolume(d10, d2);
                liquidVolIn = computeHemisphericalVolume(d10, d13);
                d13 -= d2;
                //generateProfile(s1, -1, d10, 0.0, 0.0);
            } else if (s1 == "1") {
                d2 = d10 * 0.16666666666666666;
                tankVolIn = computeASMEVolume(d10, d2);
                liquidVolIn = computeASMEVolume(d10, d13);
                d13 -= d2;
                //generateProfile(s1, -1, d10, 0.0, 0.0);
            } else if (s1 == "4") {
                s1 = getParameter("CylBottomConeHeight");
                if (s1 == null) 
					return "Failed to get Bottom Cone Height,bottomConeHeight";
                var d21 = extractDouble(s1);
                s1 = getParameter("CylBottomConeAngle");
                if (s1 == null) 
					return "Failed to get Bottom Cone Angle";
                var d17 = extractDouble(s1);
                s1 = getParameter("CylBottomConeUseAngle");
                if (s1 == null) 
					return "Failed to get Bottom Cone Angle Use Flag";
                if (s1 == "Yes") 
					flag1 = true;
					
                s1 = getParameter("CylBottomConeUseHeight");
                if (s1 == null) 
					return "Failed to get Bottom Cone Height Use Flag";
                if (s1 == "Yes") 
					flag3 = true;
                if (!flag3 && !flag1) 
					return "Bottom cone angle or height must be set.";
                if (flag3 && flag1) {
                    var d30 = d10 / 2 / Math.tan((d17 * pi) / 360);
                    if (d21 > d30) return "Invalid bottom cone height for given angle.";
                }
                if (flag3) 
					d2 = d21;
				else 
					d2 = -1; 
				if (!flag1) 
					d17 = -1;
				
                if (d2 < 0.0) 
					d2 = d10 / (2 * Math.tan((d17 * pi) / 360));
				
                if (normalCalc) {
                    bottomConeHeightFlag = flag3;
                    bottomConeHeight = d2;
                    bottomConeAngleFlag = flag1;
                    if (flag1) 
						bottomConeAngle = d17;
                    else 
						bottomConeAngle = (2 * Math.atan(d10 / (2 * d2)) * 180) / pi;
                }
                tankVolIn = computeConicalVolume(d10, d2, d17, -1);
                liquidVolIn = computeConicalVolume(d10, d2, d17, d13);
                d13 -= d2;
                //generateProfile("4", -1, d10, d17, d2);
            } else {
                return "Bad tank bottom style.,bottomShape";
            }
            tHeight = d2;
            if (normalCalc) 
				bottomHeight = d2;
				
            tankVolIn += d6 * d10 * d11;
            liquidVolIn += ll * d10 * d11;
			
            if (normalCalc) 
				sSide = d6;
            tHeight += d6;
            if (d13 > 0.0) 
				d13 -= d6;
            flag3 = false;
            flag1 = false;
            s1 = getParameter("CylTopStyle");
            if (s1 == "0") {
                //generateProfile(s1, tHeight, d10, 0.0, 0.0);
                d2 = 0.0;
                if (ll > tHeight) 
					liquidLevelWarning = ("Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d2, 1) + ").\nPlease lower the Liquid level.,liquidLevel");
            } else if (s1 == "2") {
                d2 = d10 / 4;
                var d31 = computeEllipsoidalVolume(d10, d2);
                tankVolIn += d31;
                if (d13 > 0.0) {
                    if (d13 > d2) {
                        d13 = d2;
                        liquidLevelWarning = ("Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d2, 1) + ").\nPlease lower the Liquid level.,liquidLevel");
                    }
                    liquidVolIn += d31 - computeEllipsoidalVolume(d10, d2 - d13);
                }
                //generateProfile(s1, tHeight + d2, d10, 0.0, 0.0);
            } else if (s1 == "3") {
                d2 = d10 / 2;
                var d32 = computeHemisphericalVolume(d10, d2);
                tankVolIn += d32;
                if (d13 > 0.0) {
                    if (d13 > d2) {
                        d13 = d2;
                        liquidLevelWarning = ("Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d2, 1) + ").\nPlease lower the Liquid level.,liquidLevel");
                    }
                    liquidVolIn += d32 - computeHemisphericalVolume(d10, d2 - d13);
                }
                //generateProfile(s1, tHeight + d2, d10, 0.0, 0.0);
            } else if (s1 == "1") {
                d2 = d10 * 0.16666666666666666;
                var d33 = computeASMEVolume(d10, d2);
                tankVolIn += d33;
                if (d13 > 0.0) {
                    if (d13 > d2) {
                        d13 = d2;
                        liquidLevelWarning = ("Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d2, 1) + ").\nPlease lower the Liquid level.,liquidLevel");
                    }
                    liquidVolIn += d33 - computeASMEVolume(d10, d2 - d13);
                }
                //generateProfile(s1, tHeight + d2, d10, 0.0, 0.0);
            } else if (s1 == "4") {
                var s2 = getParameter("CylTopConeHeight");
                if (s2 == null) 
					return "Failed to get Top Cone Height,topConeHeight";
					
                var d22 = extractDouble(s2);
                s2 = getParameter("CylTopConeAngle");
                if (s2 == null) 
					return "Failed to get Top Cone Angle";
					
                var d18 = extractDouble(s2);
                s2 = getParameter("CylTopConeUseAngle");
                if (s2 == null) 
					return "Failed to get Top Cone Angle Use Flag";
                if (s2 == "Yes") 
					flag1 = true;
                s2 = getParameter("CylTopConeUseHeight");
                if (s2 == null) 
					return "Failed to get Top Cone Height Use Flag";
                if (s2 == "Yes") 
					flag3 = true;
                if (!flag3 && !flag1) 
					return "Top cone angle or height must be set.";
                if (flag3 && flag1) {
                    var d34 = d10 / 2 / Math.tan((d18 * pi) / 360);
                    if (d22 > d34) 
						return "Invalid top cone height for given angle.";
                }
                if (flag3) 
					d2 = d22;
                else 
					d2 = -1; 
					
				if (!flag1) 
					d18 = -1;
					
                if (d2 < 0.0) 
					d2 = d10 / (2 * Math.tan((d18 * pi) / 360));
                if (normalCalc) {
                    topConeHeightFlag = flag3;
                    topConeHeight = d2;
                    topConeAngleFlag = flag1;
                    if (flag1) topConeAngle = d18;
                    else topConeAngle = (2 * Math.atan(d10 / (2 * d2)) * 180) / pi;
                }
                var d35 = computeConicalVolume(d10, d2, d18, -1);
                tankVolIn += d35;
                if (d13 > 0.0) {
                    if (d13 > d2) {
                        d13 = d2;
                        liquidLevelWarning = "Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank height (" + formatNumber(tHeight + d2, 1) + ").\nPlease lower the Liquid level.,liquidLevel";
                    }
                    liquidVolIn += d35 - computeConicalVolume(d10, d2, d18, d13);
                }
                //generateProfile("4", tHeight + d2, d10, d18, d2);
            } else {
                return "Bad tank top style.,topShape";
            }
            tHeight += d2;
            if (normalCalc) {
                topHeight = d2;
                overallTankHeight = bottomHeight + sSide + topHeight;
            }
            if (d10 > d11) 
				tWidth = d10;
            else 
				tWidth = d11;
        } else {
            rotate = true;
            var s3 = getParameter("HrzStraightSide");
            if (s3 == null) 
				return "Failed to get \"Straight Side\"";
            var d7 = extractDouble(s3);
            tWidth = d7;
            s3 = getParameter("HrzLiquidLevel");
            if (s3 == null) 
				return "Failed to get Liquid Level";
            var d14 = extractDouble(s3);
            ll = d14;
            s3 = getParameter("HrzDiameter");
            if (s3 == null) 
				return "Failed to get Horizontal Tank Diameter";
            var d9 = extractDouble(s3);
            if (d9 == 0.0) 
				return "Diameter can not be set to 0";
            tHeight = d9;
            tankVolIn = computeHorizontalCylinderVolume(d9, d7, d9 + 1.0);
            liquidVolIn = computeHorizontalCylinderVolume(d9, d7, d14);
            if (ll > d9) 
				liquidLevelWarning = "Warning:\n\nGiven liquid level (" + formatNumber(ll, 1) + ") is greater\nthan the tank diameter (" + formatNumber(d9, 1) + ").\nPlease lower the Liquid level.,liquidLevel";
				
            s3 = getParameter("HrzLeftStyle");
			
            var d3 = 0.0;
            if (s3 == "0")  {
				//generateProfile(s3, -1, d9, 0.0, 0.0);
			}
            else if (s3 == "2") {
                tankVolIn += computeHorizontalEllipsoidalVolume(d9, d9);
                liquidVolIn += computeHorizontalEllipsoidalVolume(d9, d14);
                tWidth += d9 / 4;
                //generateProfile(s3, -1, d9, 0.0, 0.0);
                d3 = d9 / 4;
            } else if (s3 == "3") {
                tankVolIn += computeHorizontalHemisphericalVolume(d9, d9);
                liquidVolIn += computeHorizontalHemisphericalVolume(d9, d14);
                tWidth += d9 / 2;
                //generateProfile(s3, -1, d9, 0.0, 0.0);
                d3 = d9 / 2;
            } else if (s3 == "1") {
                tankVolIn += computeHorizontalASMEVolume(d9, d9);
                liquidVolIn += computeHorizontalASMEVolume(d9, d14);
                tWidth += d9 * 0.16930000000000001;
                //generateProfile(s3, -1, d9, 0.0, 0.0);
                d3 = d9 * 0.16930000000000001;
            }
			
            if (normalCalc) 
				bottomHeight = d3;
            s3 = getParameter("HrzRightStyle");
            if (s3 == "0") {
                d3 = 0.0;
                //generateProfile(s3, tWidth, d9, 0.0, 0.0);
            } else if (s3 == "2") {
                tankVolIn += computeHorizontalEllipsoidalVolume(d9, d9);
                liquidVolIn += computeHorizontalEllipsoidalVolume(d9, d14);
                tWidth += d9 / 4;
                //generateProfile(s3, tWidth, d9, 0.0, 0.0);
                d3 = d9 / 4;
            } else if (s3 ==  "3") {
                tankVolIn += computeHorizontalHemisphericalVolume(d9, d9);
                liquidVolIn += computeHorizontalHemisphericalVolume(d9, d14);
                tWidth += d9 / 2;
                //generateProfile(s3, tWidth, d9, 0.0, 0.0);
                d3 = d9 / 2;
            } else if (s3 == "1") {
                tankVolIn += computeHorizontalASMEVolume(d9, d9);
                liquidVolIn += computeHorizontalASMEVolume(d9, d14);
                tWidth += d9 * 0.16930000000000001;
                //generateProfile(s3, tWidth, d9, 0.0, 0.0);
                d3 = d9 * 0.16930000000000001;
            }
            if (normalCalc) {
                topHeight = d3;
                overallTankHeight = d7 + topHeight + bottomHeight;
            }
        }
        var d36 = 0.00057870000000000003;
        var d37 = 1.6390000000000001 * Math.pow(10, -5);
        var d38 = 0.0043299999999999996;
        var d39 = 0.016389999999999998;
        tankVolFt = tankVolIn * d36;
        tankVolGal = tankVolIn * d38;
        tankVolLiter = tankVolIn * d39;
        tankVolMeter = tankVolIn * d37;
        liquidVolFt = liquidVolIn * d36;
        liquidVolGal = liquidVolIn * d38;
        liquidVolLiter = liquidVolIn * d39;
        liquidVolMeter = liquidVolIn * d37;
        
		return "";
    }
	
    function getLiquidLevelWarning() {
        return liquidLevelWarning;
    }
	
	
	//==============================================================================
	//  Function:  plotTank
	//------------------------------------------------------------------------------
	/** Description:  Plots the tank.
	**
	**  @param  None
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function plotTank() {
		console.log("------------plotTank()---------------");
		
		// Get the data.
	//	getData();
		
		// First, send over the parameters.
		for(i=0; i<document.forms['InputForm'].elements.length; i++)
		{
			var junk = document.getElementById('TankPlot').setParameter(document.forms['InputForm'].elements[i].name,
			 										  document.forms['InputForm'].elements[i].value);
													  
		}
		
		// Now compute the volumes.
		var errmsg = document.getElementById('TankPlot').computeVolumes();
		if(errmsg != "")
		{
			alert(errmsg);
			return;
		}
		
		// Plot the tank.
		document.getElementById('TankPlot').plotTank();
	}
	
	
	//==============================================================================
	//  Function:  loadPulldown
	//------------------------------------------------------------------------------
	/** Description:  Loads the reverse calculation pulldown.
	**
	**  @param  Flag to indicate that the results should be updated.
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function loadPulldown() {
			console.log("------------loadPulldown()---------------");
			
			
			// First, delete the options.
			var count = document.getElementById("IndependentVariable").length;
			var i;
			for(i=count-1; i>=0; i--)
			{
				document.getElementById("IndependentVariable").options[i] = null;
			}
			
			// Now load the selections.
			var tankType = document.getElementById('CurrentTankType').value;
			if(tankType == "Cyl")
			{
				i=0;
				document.getElementById("IndependentVariable").options[i++] = new Option("Diameter","diameter");
				document.getElementById("IndependentVariable").options[i++] = new Option("Straight Side","straightSide");
				document.getElementById("IndependentVariable").options[i++] = new Option("Liquid Level","liquidLevel");
			}
			else if(tankType == "Hrz")
			{
				i=0;
				document.getElementById("IndependentVariable").options[i++] = new Option("Diameter","diameter");
				document.getElementById("IndependentVariable").options[i++] = new Option("Length","straightSide");
				document.getElementById("IndependentVariable").options[i++] = new Option("Liquid Level","liquidLevel");
			}
			else
			{
				i=0;
				document.getElementById("IndependentVariable").options[i++] = new Option("Width","width");
				document.getElementById("IndependentVariable").options[i++] = new Option("Length","length");
				document.getElementById("IndependentVariable").options[i++] = new Option("Straight Side","straightSide");
				document.getElementById("IndependentVariable").options[i++] = new Option("Liquid Level","liquidLevel");
			}
			
			//Plot the tank.
			getResults(true);
	}
	
	function getForm(f, d) {
		console.log("------------getForm()---------------");
		
		if(ns4)
			return(document.layers[d].document.forms[f]);
		else
			return(document.forms[f]);
	}
	
	
	
	//==============================================================================
	//  Function:  getData
	//------------------------------------------------------------------------------
	/** Description:  Captures the tank specific data.
	**
	**  @param  None
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function getData() {
		console.log("------------getData()---------------");
		
		var tankType = document.getElementById('CurrentTankType').value;
		var lenConv = document.getElementById('CurrentLengthConversion').value;

		if(tankType == "Cyl")
		{
			var i;
			var topDone;
			var bottomDone;
			document.getElementById('CylDiameter').value = getForm("GnInp", "generalInputs").Diameter.value / lenConv;
			document.getElementById('CylLiquidLevel').value = getForm("GnInp", "generalInputs").elements['LiquidLevel'].value / lenConv;
			document.getElementById('CylStraightSide').value = getForm("GnInp", "generalInputs").elements['StraightSide'].value / lenConv;
			topDone = false;
			bottomDone = false;
			for(i=0; i<5; i++)
			{
				if(!topDone && (getForm("TankTopForm", "topButtons").TopStyle[i].checked) && (i != document.getElementById('CylTopStyle').value))
				{
					document.getElementById('CylTopStyle').value = i;
					topDone = true;
				}
				if(!bottomDone && (getForm("TankBottomForm", "bottomButtons").BottomStyle[i].checked) && (i != document.getElementById('CylBottomStyle').value))
				{
					document.getElementById('CylBottomStyle').value = i;
					bottomDone = true;
				}
			}
			
			
			if(getForm("TankTopForm", "topButtons").TopStyle[4].checked)  // Get the cone data and turn it off.
			{
				if(document.getElementById('CylTopCone').value == "Yes")
					getTopConeData();
				document.getElementById('CylTopCone').value = "Yes";
			}
			else
			{
				document.getElementById('CylTopCone').value = "No";
			}
			
			if(getForm("TankBottomForm", "bottomButtons").BottomStyle[4].checked)  // Get the cone data and turn it off.
			{
			
				if(document.getElementById('CylBottomCone').value == "Yes")
					getBottomConeData();
				document.getElementById('CylBottomCone').value = "Yes";
			}
			else
			{
				document.getElementById('CylBottomCone').value = "No";
			}
						
		}
		else if(tankType == "Rect")
		{
			document.getElementById('RectWidth').value = getForm("GnInp", "generalInputs").elements['Width'].value / lenConv;
			document.getElementById('RectLength').value = getForm("GnInp", "generalInputs").elements['Length'].value / lenConv;
			document.getElementById('RectLiquidLevel').value = getForm("GnInp", "generalInputs").elements['LiquidLevel'].value / lenConv;
			document.getElementById('RectStraightSide').value = getForm("GnInp", "generalInputs").elements['StraightSide'].value / lenConv;
		}
		else
		{
			var i;
			document.getElementById('HrzDiameter').value = getForm("GnInp", "generalInputs").elements['Diameter'].value / lenConv;
			document.getElementById('HrzLiquidLevel').value = getForm("GnInp", "generalInputs").elements['LiquidLevel'].value / lenConv;
			document.getElementById('HrzStraightSide').value = getForm("GnInp", "generalInputs").elements['StraightSide'].value / lenConv;
			for(i=0; i<4; i++)
			{
				if(getForm("TankBottomForm", "bottomButtons").BottomStyle[i].checked)
					document.getElementById('HrzLeftStyle').value = i;
				if(getForm("TankTopForm", "topButtons").TopStyle[i].checked)
					document.getElementById('HrzRightStyle').value = i;
			}
		}
	}


	//==============================================================================
	//  Function:  handleTopStyleCheck
	//------------------------------------------------------------------------------
	/** Description:  Handles when the user selects a top style.
	**
	**  @param  None
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function handleTopStyleCheck(flag) {
			
	}
	

	//==============================================================================
	//  Function:  getTopConeData
	//------------------------------------------------------------------------------
	/** Description:  Gets the data for a top cone
	**
	**  @param  None
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function getTopConeData() {
		console.log("------------getTopConeData()---------------");
		
		var lenConv = document.forms['InputForm'].elements['CurrentLengthConversion'].value;
		
		document.forms['InputForm'].elements['CylTopConeUseAngle'].value = "No";
		document.forms['InputForm'].elements['CylTopConeUseHeight'].value = "No";
		
		if(getForm("TankTopForm", "topButtons").TopStyle[4].checked)
		{
			if(getForm("TopConeForm", "TopCone").elements['UseTopConeAngle'].checked)
			{
				document.forms['InputForm'].elements['CylTopConeUseAngle'].value = "Yes";
				document.forms['InputForm'].elements['CylTopConeAngle'].value = getForm("TopConeForm", "TopCone").elements['TopConeAngle'].value;
			}
		}
			
		
		if(getForm("TankTopForm", "topButtons").TopStyle[4].checked)
		{
			if(getForm("TopConeForm", "TopCone").elements['UseTopConeHeight'].checked)
			{
				document.forms['InputForm'].elements['CylTopConeUseHeight'].value = "Yes";
				document.forms['InputForm'].elements['CylTopConeHeight'].value = getForm("TopConeForm", "TopCone").elements['TopConeHeight'].value / lenConv;
			}
		}
	}


	//==============================================================================
	//  Function:  getBottomConeData
	//------------------------------------------------------------------------------
	/** Description:  Gets the data for a Bottom cone
	**
	**  @param  None
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function getBottomConeData() {
		console.log("------------getBottomConeData()---------------");
		
		var lenConv = document.forms['InputForm'].elements['CurrentLengthConversion'].value;
		
		document.forms['InputForm'].elements['CylBottomConeUseAngle'].value = "No";
		document.forms['InputForm'].elements['CylBottomConeUseHeight'].value = "No";

		if(getForm("TankBottomForm", "bottomButtons").BottomStyle[4].checked)
		{
			if(getForm("BottomConeForm", "BottomCone").elements['UseBottomConeAngle'].checked)
			{
				document.forms['InputForm'].elements['CylBottomConeUseAngle'].value = "Yes";
				document.forms['InputForm'].elements['CylBottomConeAngle'].value = getForm("BottomConeForm", "BottomCone").elements['BottomConeAngle'].value;
			}
		}
			
		
		if(getForm("TankBottomForm", "bottomButtons").BottomStyle[4].checked)
		{
			if(getForm("BottomConeForm", "BottomCone").elements['UseBottomConeHeight'].checked)
			{
				document.forms['InputForm'].elements['CylBottomConeUseHeight'].value = "Yes";
				document.forms['InputForm'].elements['CylBottomConeHeight'].value = getForm("BottomConeForm", "BottomCone").elements['BottomConeHeight'].value / lenConv;
			}
		}
			
	}


	//==============================================================================
	//  Function:  displayTopConeWidgets
	//------------------------------------------------------------------------------
	/** Description:  Displays the top cone parameters.
	**
	**  @param  flag - 0 to turn off, 1 to turn on.
	**  @param  update - flag to update data.
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function displayTopConeWidgets(flag, update) {
		console.log("------------displayTopConeWidgets()---------------");


		if(flag == 1)
		{
			var len = document.forms['InputForm'].elements['CurrentLengthUnits'].value;
			var lenConv = document.forms['InputForm'].elements['CurrentLengthConversion'].value;
			var achecked = '', hchecked = '';
			var angle = document.forms['InputForm'].elements['CylTopConeAngle'].value;
			var height = formatNumber(document.forms['InputForm'].elements['CylTopConeHeight'].value *  lenConv, 2);
			if(document.forms['InputForm'].elements['CylTopConeUseAngle'].value == "Yes")
				achecked = 'checked';
			if(document.forms['InputForm'].elements['CylTopConeUseHeight'].value == "Yes")
				hchecked = 'checked';
			document.forms['InputForm'].elements['CylTopCone'].value = "Yes";
			rewriteLayer('TopCone', 
			    '<form action="DoNothing" name="TopConeForm" id="TopConeForm">' +
				'<table cellspacing="2" cellpadding="2">' +
				'    <tr align="Left" valign="top">' +
				'		<td align="left">' +
				'			<font size="+1"><b>Top Cone</b></font>' +
				'		</td>' +
				'    </tr><tr align="left">' +
				'		<td align="left">' +
				'			<input type="checkbox" name="UseTopConeAngle" value="" ' + achecked + ' onClick="getResults(true,event);">Cone Angle' +
				'		</td><td align="Right">' +
				'			<input type="text" name="TopConeAngle" value="' + angle + '" size="6" onKeyUp="getResults(true,event);"><br>' +
				'    </tr><tr align="left">' +
				'		</td><td align="Left">' +
				'			<input type="checkbox" name="UseTopConeHeight" value="" ' + hchecked + ' onClick="getResults(true,event);">Cone Height ' + len +
				'		</td><td align="Right">' +
				'			<input type="text" name="TopConeHeight" value="' + height + '" size="6" onKeyUp="getResults(true,event);">' +
				'		</td>' +
				'	</tr>' +
				'</table></form>');
		}
		else
		{
			rewriteLayerWithWidth('TopCone','<font size="+1"> </font>', 1, 1);
		}
		
		//Plot the tank.
	//	plotTank();
	if(update)
		getResults(true);
	}
	

	//==============================================================================
	//  Function:  displayBottomConeWidgets
	//------------------------------------------------------------------------------
	/** Description:  Displays the Bottom cone parameters.
	**
	**  @param  flag - 0 to turn off, 1 to turn on.
	**  @param  update - flag to update data.
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function displayBottomConeWidgets(flag, update) {
		console.log("------------displayBottomConeWidgets()---------------");
		
		
		if(flag == 1)
		{
			var len = document.forms['InputForm'].elements['CurrentLengthUnits'].value;
			var lenConv = document.forms['InputForm'].elements['CurrentLengthConversion'].value;
			var achecked = '', hchecked = '';
			var angle = document.forms['InputForm'].elements['CylBottomConeAngle'].value;
			var height = formatNumber(document.forms['InputForm'].elements['CylBottomConeHeight'].value *  lenConv, 2);
			if(document.forms['InputForm'].elements['CylBottomConeUseAngle'].value == "Yes")
				achecked = 'checked';
			if(document.forms['InputForm'].elements['CylBottomConeUseHeight'].value == "Yes")
				hchecked = 'checked';
			document.forms['InputForm'].elements['CylBottomCone'].value = "Yes";
			rewriteLayer('BottomCone',
			    '<form action="DoNothing" name="BottomConeForm" id="BottomConeForm">' +
				'<table cellspacing="2" cellpadding="2">' +
				'    <tr align="Left" valign="top">' +
				'		<td align="left">' +
				'			<font size="+1"><b>Bottom Cone</b></font>' +
				'		</td>' +
				'    </tr><tr align="left">' +
				'		<td align="left">' +
				'			<input type="checkbox" name="UseBottomConeAngle" value="" ' + achecked + ' onClick="getResults(true,event);">Cone Angle' +
				'		</td><td align="Right">' +
				'			<input type="text" name="BottomConeAngle" value="' + angle + '" size="6" onKeyUp="getResults(true,event);"><br>' +
				'    </tr><tr align="left">' +
				'		</td><td align="Left">' +
				'			<input type="checkbox" name="UseBottomConeHeight" value="" ' + hchecked + ' onClick="getResults(true,event);">Cone Height ' + len +
				'		</td><td align="Right">' +
				'			<input type="text" name="BottomConeHeight" value="' + height + '" size="6" onKeyUp="getResults(true,event);">' +
				'		</td>' +
				'	</tr>' +
				'</table></form>');
		}
		else
		{
		//	getBottomConeData();
			document.forms['InputForm'].elements['CylBottomCone'].value = "No";
			rewriteLayer('BottomCone','<font size="+1"> </font>');
		}
		
		//Plot the tank.
	//	plotTank();
	if(update)
		getResults(true);
	}
	

	//==============================================================================
	//  Function:  formatNumber
	//------------------------------------------------------------------------------
	/** Description:  Formats a floating point number.
	**
	**  @param  n - the number to be formated.
	**  @param  decimalPlaces - the number of decimal places to use.
	**  @return  float - the formatted number
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function formatNumber(n, decimalPlaces) {
		console.log("------------formatNumber()---------------");
	
		var factor = Math.pow(10.0, decimalPlaces);
		var bign = n * factor;
		var fixedn = Math.floor(bign) / factor;
		return(fixedn);
	}

	
	//==============================================================================
	//  Function:  displayInputData
	//------------------------------------------------------------------------------
	/** Description:  Displays the tank-specific input fields.
	**
	**  @param  None
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function displayInputData() {
		console.log("------------displayInputData()---------------");
	
	
		var lenConv = document.getElementById('CurrentLengthConversion').value;
	
		var len = ' ' + document.getElementById('CurrentLengthUnits').value + '<br>';
		var vol = document.getElementById('CurrentVolumeUnits').value;
		var cap = document.getElementById('CurrentCapacityUnits').value;
		
		var tankType = document.getElementById('CurrentTankType').value;

		if(tankType == "Cyl")
		{
			var diam = document.getElementById('CylDiameter').value;
			var side = document.getElementById('CylStraightSide').value;
			var ll = document.getElementById('CylLiquidLevel').value;
			var topCone = document.getElementById('CylTopCone').value;
			var bottomCone = document.getElementById('CylBottomCone').value;
			rewriteLayer('generalInputs',
				'<form action="DoNothing" name="GnInp" id="GnInp">' +
			    '<table cellspacing="3" cellpadding="3">' +
				'    <tr align="left">' +
				'		<td align="left">' +
				'			<font size="+1">Diameter' + len + ' <input type="text" name="Diameter" value="' + formatNumber(diam * lenConv, 2) + '" size="9" onKeyUp="getResults(true,event);"></font>' +
				'		</td>' +
				'		<td align="left">' +
				'			<font size="+1">Straight Side' + len + ' <input type="text" name="StraightSide" value="' + formatNumber(side * lenConv, 2) + '" size="9" onKeyUp="getResults(true,event);"></font>' +
				'		</td>' +
				'		<td>' +
				'			<font size="+1">Liquid Level' + len + ' <input type="text" name="LiquidLevel" value="' + ll * lenConv + '" size="9" onKeyUp="getResults(true,event);"></font>' +
				'		</td>' +
			//	'		<td>' + 
			//	'			<input type="button" name="Compute" value="Update" width="20" height="20" onClick="getResults(true);">' +
			//	'		</td>' +
				'	</tr>' +
				'</table></form>');
				
			if(topCone == "Yes")
				displayTopConeWidgets(1, false);
			else
				displayTopConeWidgets(0, false);
			if(bottomCone == "Yes")
				displayBottomConeWidgets(1, false);
			else
				displayBottomConeWidgets(0, false);
		}
		else if(tankType == "Rect")
		{
			var wid = formatNumber(document.getElementById('RectWidth').value * lenConv, 2);
			var leng = formatNumber(document.getElementById('RectLength').value* lenConv, 2);
			var side = formatNumber(document.getElementById('RectStraightSide').value* lenConv, 2);
			var ll = formatNumber(document.getElementById('RectLiquidLevel').value* lenConv, 2);
			var junk = '<form action="DoNothing" name="GnInp" id="GnInp">' +
			  		  	'<table cellspacing="3" cellpadding="3">' +
						'    <tr align="left" valign="top">' +
						'		<td align="left">' +
						'			<font size="+1">Width' + len + ' <input type="text" name="Width" value="' + wid + '" size="9" onKeyUp="getResults(true,event);"></font><br>' +
						'			<font size="+1">Length' + len + ' <input type="text" name="Length" value="' + leng + '" size="9" onKeyUp="getResults(true,event);"></font>' +
						'		</td>' +
						'		<td align="left">' +
						'			<font size="+1">Straight Side' + len + ' <input type="text" name="StraightSide" value="' + side + '" size="9" onKeyUp="getResults(true,event);"></font>' +
						'		</td>' +
						'		<td>' +
						'			<font size="+1">Liquid Level' + len + ' <input type="text" name="LiquidLevel" value="' + ll + '" size="9" onKeyUp="getResults(true,event);"></font>' +
						'		</td>' +
						'	</tr>' +
						'</table></form>';
			rewriteLayer('generalInputs', junk);
			displayTopConeWidgets(0, false);
			displayBottomConeWidgets(0, false);
		}
		else
		{
			var diam = document.getElementById('HrzDiameter').value;
			var side = document.getElementById('HrzStraightSide').value;
			var ll = document.getElementById('HrzLiquidLevel').value;
			rewriteLayer('generalInputs',
				'<form action="DoNothing" name="GnInp" id="GnInp">' +
			  	'<table cellspacing="3" cellpadding="3">' +
				'    <tr align="left">' +
				'		<td align="left">' +
				'			<font size="+1">Diameter' + len + ' <input type="text" name="Diameter" value="' + formatNumber(diam * lenConv, 2) + '" size="9" onKeyUp="getResults(true,event);"></font>' +
				'		</td>' +
				'		<td align="left">' +
				'			<font size="+1">Length' + len + ' <input type="text" name="StraightSide" value="' + formatNumber(side * lenConv, 2) + '" size="9" onKeyUp="getResults(true,event);"></font>' +
				'		</td>' +
				'		<td>' +
				'			<font size="+1">Liquid Level' + len + ' <input type="text" name="LiquidLevel" value="' + ll * lenConv + '" size="9" onKeyUp="getResults(true,event);"></font>' +
				'		</td>' +
			//	'		<td>' + 
			//	'			<input type="button" name="Compute" value="Update" width="20" height="20" onClick="getResults(true);">' +
			//	'		</td>' +
				'	</tr>' +
				'</table></form>');
			displayTopConeWidgets(0, false);
			displayBottomConeWidgets(0, false);
		}

	}
	

	//==============================================================================
	//  Function:  handleUnits
	//------------------------------------------------------------------------------
	/** Description:  Handles the units change.
	**
	**  @param  flag - 1 for English, 2 for metric
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function handleUnits(flag) {
		console.log("------------handleUnits()---------------");
		
		if(flag == 1)  // English
		{
			document.forms['InputForm'].elements['CurrentLengthConversion'].value = 1.0;
			document.forms['InputForm'].elements['CurrentVolumeConversion'].value = 1.0;
			document.forms['InputForm'].elements['CurrentCapacityConversion'].value = 1.0;
			document.forms['InputForm'].elements['CurrentLengthUnits'].value = "(in)";
			document.forms['InputForm'].elements['CurrentVolumeUnits'].value = "(ft<sup><font size=\"-1\">3</font></sup>)";
			document.forms['InputForm'].elements['CurrentCapacityUnits'].value = "(gal)";
		}
		else
		{
			document.forms['InputForm'].elements['CurrentLengthConversion'].value = 25.4;
			document.forms['InputForm'].elements['CurrentVolumeConversion'].value = 1.0;
			document.forms['InputForm'].elements['CurrentCapacityConversion'].value = 1.0;
			document.forms['InputForm'].elements['CurrentLengthUnits'].value = "(mm)";
			document.forms['InputForm'].elements['CurrentVolumeUnits'].value = "(m<sup><font size=\"-1\">3</font></sup>)";
			document.forms['InputForm'].elements['CurrentCapacityUnits'].value = "litres";
		}
		
		var len = document.forms['InputForm'].elements['CurrentLengthUnits'].value;
		var vol = document.forms['InputForm'].elements['CurrentVolumeUnits'].value;
		var cap = document.forms['InputForm'].elements['CurrentCapacityUnits'].value;
		
		displayInputData();
		getResults(true);
	}

	function handleTankCheck(flag) {
		console.log("------------handleTankCheck()---------------");
	
		writeTankButtons(flag);
	}
	
	//==============================================================================
	//  Function:  handleTankChange
	//------------------------------------------------------------------------------
	/** Description:  Handles a change in tank type.
	**
	**  @param  flag - 1 for Cylindrical, 2 for Rectangular, 3 for Horizontal
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function handleTankChange(flag) {
		console.log("------------handleTankChange()---------------");
		
		getData();
		if(flag == 1)
			document.forms['InputForm'].elements['CurrentTankType'].value = "Cyl";
		else if(flag == 2)
			document.forms['InputForm'].elements['CurrentTankType'].value = "Rect";
		else
			document.forms['InputForm'].elements['CurrentTankType'].value = "Hrz";
		displayWidgets();
		displayInputData();

		//loadPulldown();
	}
		

	//==============================================================================
	//  Function:  displayWidgets
	//------------------------------------------------------------------------------
	/** Description:  Display the appropriate widgets for a given tank
	**
	**  @param  None
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function displayWidgets() {
		console.log("------------displayWidgets()---------------");
		
		var tankType = document.forms['InputForm'].elements['CurrentTankType'].value;
		if(tankType == "Cyl")
		{
			writeTankButtons(1);
		}
		else if(tankType == "Rect")
		{
			writeTankButtons(2);
		}
		else
		{
			writeTankButtons(3);
		}
	}
	
	
	//==============================================================================
	//  Function:  writeTankButtons
	//------------------------------------------------------------------------------
	/** Description:  Write the tank-specific buttons.
	**
	**  @param  flag - 1 for Cylindrical, 2 for Rectangular, 3 for Horizontal
	**  @return  void
	**/
	//------------------------------------------------------------------------------
	// Modification History
	//
	// Date        Developer            Modification 
	// ---------   ------------------   --------------------------------------------
	//==============================================================================	
	function writeTankButtons(flag) {
		console.log("------------writeTankButtons()---------------");
		
		if(flag == 1)
		{
			var stuff = '<form action="DoNothing" name="TankBottomForm" id="TankBottomForm">' +
			    '<font size="+1"><b>Bottom Style</b><br><hr size="2" noshade>' + 
				'<input type="radio" name="BottomStyle" value="Flat" checked onClick="displayBottomConeWidgets(0, true);">Flat<br>' + 
				'<input type="radio" name="BottomStyle" value="ASME Dish" onClick="displayBottomConeWidgets(0, true);">ASME Dish<br>' + 
				'<input type="radio" name="BottomStyle" value="Ellipsoidal" onClick="displayBottomConeWidgets(0, true);">Ellipsoidal (2:1)<br>' + 
				'<input type="radio" name="BottomStyle" value="Hemispherical" onClick="displayBottomConeWidgets(0, true);">Hemispherical<br>' + 
				'<input type="radio" name="BottomStyle" value="Conical" onClick="displayBottomConeWidgets(1, true);">Conical</font><form>';
			rewriteLayer('bottomButtons', stuff);
			var i = document.forms['InputForm'].elements['CylBottomStyle'].value;
			getForm("TankBottomForm", "bottomButtons").BottomStyle[i].checked = true;
				
			stuff =  '<form action="DoNothing" name="TankTopForm" id="TankTopForm">' + 
				'<font size="+1"><b>Top Style</b><br><hr size="2" noshade>' + 
				'<input type="radio" name="TopStyle" value="Flat/Open" checked onClick="displayTopConeWidgets(0, true);">Flat<br>' + 
				'<input type="radio" name="TopStyle" value="ASME Dish" onClick="displayTopConeWidgets(0, true);">ASME Dish<br>' + 
				'<input type="radio" name="TopStyle" value="Ellipsoidal" onClick="displayTopConeWidgets(0, true);">Ellipsoidal (2:1)<br>' + 
				'<input type="radio" name="TopStyle" value="Hemispherical" onClick="displayTopConeWidgets(0, true);">Hemispherical<br>' + 
				'<input type="radio" name="TopStyle" value="Conical" onClick="displayTopConeWidgets(1, true);">Conical</font></form>';
			rewriteLayer('topButtons', stuff);
			i = document.forms['InputForm'].elements['CylTopStyle'].value;
			getForm("TankTopForm", "TopButtons").TopStyle[i].checked = true;
		}
		else if(flag == 2)
		{
			rewriteLayer('bottomButtons',
				'<font size="+1"><b>Bottom Style</b><br><hr size="2" noshade>' + 
				'<input type="radio" name="BottomStyle" value="Flat" checked>Flat</font>');
			rewriteLayer('topButtons',
				'<font size="+1"><b>Top Style</b><br><hr size="2" noshade>' + 
				'<input type="radio" name="Toptyle" value="Flat/Open" checked>Flat</font>');
		}
		else
		{
			rewriteLayer('bottomButtons',
				'<form action="DoNothing" name="TankBottomForm" id="TankBottomForm">' +
				'<font size="+1"><b>Left End Style</b><br><hr size="2" noshade>' + 
				'<input type="radio" name="BottomStyle" value="Flat" checked onClick="displayBottomConeWidgets(0, true);">Flat<br>' + 
				'<input type="radio" name="BottomStyle" value="ASME Dish" onClick="displayBottomConeWidgets(0, true);">ASME Dish<br>' + 
				'<input type="radio" name="BottomStyle" value="Ellipsoidal" onClick="displayBottomConeWidgets(0, true);">Ellipsoidal (2:1)<br>' + 
				'<input type="radio" name="BottomStyle" value="Hemispherical" onClick="displayTopConeWidgets(0, true);">Hemispherical</font></form>');
			i = document.forms['InputForm'].elements['HrzLeftStyle'].value;
			getForm("TankBottomForm", "bottomButtons").BottomStyle[i].checked = true;
				
			rewriteLayer('topButtons',
				'<form action="DoNothing" name="TankTopForm" id="TankTopForm">' +
				'<font size="+1"><b>Right End Style</b><br><hr size="2" noshade>' + 
				'<input type="radio" name="TopStyle" value="Flat" checked onClick="displayTopConeWidgets(0, true);">Flat<br>' + 
				'<input type="radio" name="TopStyle" value="ASME Dish" onClick="displayTopConeWidgets(0, true);">ASME Dish<br>' + 
				'<input type="radio" name="TopStyle" value="Ellipsoidal" onClick="displayTopConeWidgets(0, true);">Ellipsoidal (2:1)<br>' + 
				'<input type="radio" name="TopStyle" value="Hemispherical" onClick="displayTopConeWidgets(0, true);">Hemispherical</font></form>');
			i = document.forms['InputForm'].elements['HrzRightStyle'].value;
			getForm("TankTopForm", "topButtons").TopStyle[i].checked = true;
		}
	}
	
	function initialize() {
		console.log("------------initialize()---------------");
		
		displayInputData();
		getResults(true);
		//loadPulldown();
	}
