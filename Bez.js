var canvas = document.getElementById('bez');
var context = canvas.getContext('2d');

var flag = 0;
var flag_bez = 0;

function Bez(x0, y0, x1, y1, x2, y2){
	if(d(x0, y0, x1, y1, x2, y2) > parseInt("1px", 10)){
		var x3= 0.5*x0 + 0.5*x1;
		var y3= 0.5*y0 + 0.5*y1;
		
		var x4= 0.5*x1 + 0.5*x2;
		var y4= 0.5*y1 + 0.5*y2;
		
		var x5= 0.5*x3 + 0.5*x4;
		var y5= 0.5*y3 + 0.5*y4;
		
		Bez(x0, y0, x3, y3, x5, y5);
		Bez(x5, y5, x4, y4, x2, y2);
	} else{
		drawLine(x0, y0, x2, y2);
		return;
	}
}

function d(x0, y0, x1, y1, x2, y2){
	return Math.abs((y2-y0)*x1 - (x2 - x0) * y1 + (x2*y0 - x0*y2)) / (Math.sqrt((y2-y0)*(y2-y0) + (x2 - x0)*(x2 - x0)))
}

canvas.addEventListener("click", function(event){
	if(!flag_bez){
		if(!flag){
			x0 = event.offsetX;
			y0 = event.offsetY;
			context.fillRect(x0, y0,2,2);
			flag = 1;
		} else{	
			x1 = event.offsetX;
			y1 = event.offsetY;
			context.fillRect(x1, y1,2,2);
			flag = 0;
			flag_bez = 1;
		}
	}else{
		x2 = event.offsetX;
		y2 = event.offsetY;
		context.fillRect(x2, y2,2,2);
		Bez(x0, y0, x1, y1, x2, y2);
	}
                });

function drawLine(Xd, Yd, Xf, Yf){
			var Dx,Dy,Dx2,Dy2,Dxy,S;
			var Xinc,Yinc,X,Y;
			var col, i;
			col = 5;
			if (Xd < Xf) Xinc = 1; else Xinc = -1;
			if (Yd < Yf) Yinc = 1; else Yinc = -1;
			Dx = Math.abs(Xd - Xf);
			Dy = Math.abs(Yd - Yf);
			Dx2 = Dx + Dx; Dy2 = Dy + Dy;
			X = Xd; Y = Yd;
				if (Dx > Dy){
				S = Dy2 - Dx;
				Dxy = Dy2 - Dx2;
				for (i=0; i < Dx; i++){
					if (S >= 0){
						Y = Y + Yinc;
						S = S + Dxy;
 					} else S = S + Dy2;
					X = X + Xinc;
					context.fillRect(X,Y,1,1);
				}
			}
            else{
                S = Dx2 - Dy;
                Dxy = Dx2 - Dy2;
                for (i=0; i < Dy; i++){
                    if ( S >= 0){
                        X = X + Xinc;
                        S = S + Dxy;
                    } else S = S + Dx2;
                    Y = Y + Yinc;
                    context.fillRect(X,Y,1,1);
                }
            }
        }