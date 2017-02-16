/**
 * Created by aleksandrzukov on 17.02.17.
 */


function add() {
    var newitemnum = 3;
    var newitemdesc = ["Modeck", "Adam", "Denis", "Arab", "Usar", "Cofi", "Alex", "Vatir", "Amir", "Zak", "Yui", "Lu", "Canza", "Kurwa", "Lubov", "Kuan", "Chi", "Abdul"];
    for (var i = 0; i < 17; i++) {
    $("#myselect").append('<option value="'+newitemnum+'" selected="">'+newitemdesc[i]+'</option>');
    }
    $("#myselect").selectpicker("refresh");
}
