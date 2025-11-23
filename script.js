const tooltip = document.getElementById('tooltip');

document.querySelectorAll('svg a').forEach(area => {
    area.addEventListener('mousemove', (e) => {
        tooltip.innerHTML = area.dataset.info;
        tooltip.style.opacity = 1;
        tooltip.style.left = (e.pageX + 10) + 'px';
        tooltip.style.top = (e.pageY + 10) + 'px';
    });

    area.addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
    });
});




//window.onload = async () => {
    //const svgObj = document.getElementById("worldmap");

    //svgObj.addEventListener("load", async () => {
        //const svgDoc = svgObj.contentDocument;

        //const res = await fetch("http://127.0.0.1:8000/countries");
        //const countryCodes = await res.json();

        //console.log("Loaded countries:", countryCodes);

        //countryCodes.forEach(code => {
            //const region = svgDoc.getElementById(code);  // your SVG id MUST match code
            //if (region) {
                //region.style.fill = "lightgreen";

                //region.addEventListener("click", async () => {
                    //const detailsRes = await fetch(`http://127.0.0.1:8000/country/${code}`);
                    //const details = await detailsRes.json();

                    //alert(`Country: ${details.name}\nCapital: ${details.capital}`);
                //});
            //}
        //});
    //});
//};
