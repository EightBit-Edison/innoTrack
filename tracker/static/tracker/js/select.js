/**
 * Created by aleksandrzukov on 17.02.17.
 */
var map;

function initMap() {
            var lat = 51.738516;
            var lng = 36.145149;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: lat, lng: lng},
                zoom: 7
            });
                }
                
                
function SetMarker(lat, lng) {
   var myLatLng = {lat: lat, lng: lng};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation: google.maps.Animation.DROP
  });

}

function SetUser() {
    var e = document.getElementById("myselect");
    var strUser = e.options[e.selectedIndex].text;
    $("#Name").remove();
    $("#Stat").remove();
    $("#Date").remove();


    try {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", '/users/?format=json', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var j = data.length;
                for (var i = 0; i < j; i++) {
                    if (strUser === data[i].username) {
                        var Name = data[i].username;
                        $("#userparam").append('<td id="Name">' + Name + '</td>');
                        if (data[i].is_staff === true) {
                            $("#userparam").append('<td id="Stat">Administartor</td>');
                        } else if (data[i].is_staff === false) {
                            $("#userparam").append('<td id="Stat">Student</td>');
                        }

                    }

                }
            }
        };


        var x = new XMLHttpRequest();
        var x1 = new XMLHttpRequest();
        x1.open("GET", '/users/?format=json', true);
        x.open('GET', '/geolabels/?format=json', true);
        x.onreadystatechange = function () {
            if (x.readyState === XMLHttpRequest.DONE && x.status === 200) {
                var loc = JSON.parse(x.responseText);
                var dat = setTimeout(JSON.parse(x1.responseText),1500);
                var q = dat.length;
                var m = loc.length;
                for (var i = 0; i < m; i++) {
                    for (var n = 0; n < q; n++) {
                        if ((loc[i].student === dat[n].url) && (strUser === dat[n].username)) {
                            //alert('Имя: '+ dat[n].username + '  Долгота: ' + loc[i].longitude + '   Широта: ' + loc[i].latitude);
                            SetMarker(loc[i].longitude, loc[i].latitude);
                            $("#userparam").append('<td id="Date">' + loc[n].location_date + '</td>');

                        }
                    }
                }


            }
        };
        xhr.send();
        x1.send();
        x.send();

    }
    catch(err) {
       SetUser();
    }
}

function Get() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/users/?format=json', true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ) {
            var data = JSON.parse(xhr.responseText);
            var j = data.length;
            var newitemnum = 3;
            for (var i = 0; i < j; i++) {
                var newitemdesc = data[i].username;
                $("#myselect").append('<option value="'+newitemnum+'" selected="">'+newitemdesc+'</option>');
             }
            $("#myselect").val('');
            $("#myselect").selectpicker("refresh");

        }
    };

    xhr.send();

}
