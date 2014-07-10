function extractDouble(s) {
	return parseFloat(s);
}

function computeCylinderVolume(d, d1) {
	d2 = d / 2;
	return 3.1415926535897931 * d2 * d2 * d1;
}
function computeHorizontalCylinderVolume(d, d1, d2) {
	d3 = d / 2;
	if (d2 > d) {
		return computeCylinderVolume(d, d1);
	} else {
		d4 = Math.acos(1.0 - d2 / d3);
		return d1 * d3 * d3 * (d4 - Math.sin(d4) * Math.cos(d4));
	}
}
function computeHemisphericalVolume1(d, d1,  d2, flag) {
	 d3 = -1;
	 d4 = d / 2;
	if (flag && d2 > d4) d2 = d4;
	else if (d2 > d) d2 = d;
	if (d1 >= 0.0 && d2 >= 0.0 && d1 <= d4) {
		 d6 = 3.1415926535897931 * d2 * d2 * (d4 - d2 / 3);
		 d5 = 3.1415926535897931 * d1 * d1 * (d4 - d1 / 3);
		d3 = d6 - d5;
	}
	return d3;
}
function computeHemisphericalVolume( d,  d1) {
	return computeHemisphericalVolume1(d, 0.0, d1, true);
}

function computeASMEVolume( d,  d1) {
	 d5 = d1;
	 d6 = -3.9033925000000001 * Math.pow(10, -6);
	 d7 = 0.69278311999999997;
	 d8 = 2.1820792999999998;
	 d9 = -23.265250000000002;
	 d10 = 98.417320000000004;
	if (d1 > d * 0.16930000000000001) 
		d1 = d * 0.16930000000000001;
	if (d5 > d * 0.1163) 
		d5 = d * 0.1163;
	d2 = computeHemisphericalVolume(d * 2, d5);
	
	if (d2 < 0.0 || d1 <= d5) {
		return d2;
	} else {
		d5 = (d1 - d5) / d;
		d3 = d6 + d7 * d5 + d8 * d5 * d5 + d9 * d5 * d5 * d5 + d10 * d5 * d5 * d5 * d5;
		d4 = d3 * d * d * d;
		return d2 + d4;
	}
}
function computeHorizontalASMEVolume(d,  d1) {
	d2 = (3 * d) / 2;
	return 0.21482999999999999 * d1 * d1 * (d2 - d1);
}
function computeEllipsoidalVolume( d,  d1) {
	 d2 = d / 4;
	 d3 = d2 * d2;
	 d4 = d / 2;
	 d5 = d4 * d4;
	 d6 = -d2;
	if (d1 > d2) 	
		d1 = d2;
	d7 = d1 - d2;
	if (d1 > d2) 
		d1 = d2;
	d8 = 3.1415926535897931 * (d5 * d6 - (d5 / (d3 * 3)) * d6 * d6 * d6);
	d9 = 3.1415926535897931 * (d5 * d7 - (d5 / (d3 * 3)) * d7 * d7 * d7);
	return d9 - d8;
}
function computeHorizontalEllipsoidalVolume( d,  d1) {
	 d2 = d / 2;
	 d3 = d2 * d2;
	 d4 = d / 4;
	 d5 = d4 * d4;
	 d6 = d2;
	 d7 = d6 * d6;
	 d8 = -d6;
	 d9 = d1 - d6;
	 d10 = 3.1415926535897931 * d2 * d4 * (((2 * d6) / 3 + d8) - (d8 * d8 * d8) / (3 * d7));
	 d11 = 3.1415926535897931 * d2 * d4 * (((2 * d6) / 3 + d9) - (d9 * d9 * d9) / (3 * d7));
	return (d11 - d10) / 2;
}
function computeConicalVolume( d,  d1,  d2,  d3) {
	d2 *= 0.0087266462599716477;
	if (d2 < 0.0) 
		d2 = Math.atan(d / (2 * d1));
		
	 d5 = d / 2 / Math.tan(d2);
	 d4 = 0.0;
	 d6 = d / (2 * d5);
	if (d1 > 0.0) d4 = d5 - d1;
	if (d3 > 0.0) {
		if (d3 > d5 - d4) d3 = d5 - d4;
		d5 = d4 + d3;
	}
	d6 *= d6;
	
	 d7 = (3.1415926535897931 * d6 * d4 * d4 * d4) / 3;
	 d8 = (3.1415926535897931 * d6 * d5 * d5 * d5) / 3;
	return d8 - d7;
}

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
var data = {};

function setParameter() {
	
	var s_unit = $('#units').val();
	var shape_array = {'Flat' : 0, 'ASME': 1, 'Hemispherical':3, 'Elipsoidal':2, 'Conical':4};
	var shape_type_array = {'Cylindrical': 'Cyl', 'Rectangular': 'Rect'};
	var shapeType = $('#shapeType').val()
	data['CurrentTankType'] = shape_type_array[shapeType];
	data['CylDiameter'] = getValueByUnit('diameterSlider', s_unit);
	data['CylStraightSide'] = getValueByUnit('sideHeightSlider', s_unit);
	data['CylLiquidLevel'] = getValueByUnit('fillLevelSlider', s_unit);
	data['CylBottomStyle'] = shape_array[$('#shapeBottom_'+shapeType).val()];
	data['CylTopStyle'] = shape_array[$('#shapeTop_'+shapeType).val()];
	data['RectStraightSide'] = getValueByUnit('height', s_unit);
	data['RectLiquidLevel'] = getValueByUnit('fillLevelSlider', s_unit);
	data['RectWidth'] = getValueByUnit('width', s_unit);
	data['RectLength'] = getValueByUnit('length', s_unit);
	data['CylBottomConeHeight'] = getValueByUnit('bottomConicalHeight', s_unit);
	data['CylBottomConeAngle'] = $('#bottomConicalAngle').val();
	data['CylBottomConeUseHeight'] =  $('#useBottomConicalHeight').val();
	data['CylBottomConeUseAngle'] =  'Yes';
	data['CylTopConeHeight'] = getValueByUnit('topConicalHeight', s_unit);
	data['CylTopConeAngle'] = $('#topConicalAngle').val();
	data['CylTopConeUseHeight'] =  $('#useTopConicalHeight').val();
	data['CylTopConeUseAngle'] = 'Yes';
}

function getParameter(s){
	return data[s];
}

function computeVolumes(){
	
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
		
		setParameter();
		
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
                /*if (!flag2 && !flag) 
					return "Bottom cone angle or height must be set.";*/
				if (!flag){
					d15 = 90;
					flag=true;
				}
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
                /*if (!flag2 && !flag) 
					return "Top cone angle or height must be set.";*/
				if (!flag){
					flag = true;
					d16 = 90;
				}
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
            
            var d2=0.0;
            
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
            
            tHeight += d2;
            if (normalCalc) {
                topHeight = d2;
                overallTankHeight = bottomHeight + sSide + topHeight;
            }
            if (d10 > d11) 
				tWidth = d10;
            else 
				tWidth = d11;
        }
        var d36 = 0.00057870000000000003;
        var d37 = 1.6390000000000001 * Math.pow(10, -5);
        var d38 = 0.0043299999999999996;
        var d39 = 0.016389999999999998;
		
		setResult();
        
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
function formatNumber(n, decimalPlaces) {
	var factor = Math.pow(10.0, decimalPlaces);
	var bign = n * factor;
	var fixedn = Math.floor(bign) / factor;
	return(fixedn);
}
	
function setResult(){
	$('.tankvolume_result p:eq(0)').html(formatNumber(tankVolIn,2) + ' gallons');	
	$('.tankvolume_result p:eq(1)').html(formatNumber(tankVolIn,2) + 'x10<sup>6</sup>' + ' liters');	
	$('.contentsvolume_result p:eq(0)').html(formatNumber(liquidVolIn,2)  + ' gallons');	
	$('.contentsvolume_result p:eq(1)').html(formatNumber(liquidVolIn,2) + 'x10<sup>6</sup>' + ' liters');	
	
}