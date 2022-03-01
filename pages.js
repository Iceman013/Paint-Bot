function setPage(input) {
    var pages = ["manual","mixer","material","manage","market"];
    var a = 0;
    while (a < pages.length) {
        document.getElementById(pages[a]).style.display = "none";
        document.getElementById(pages[a] + "Button").classList.remove("pressed");
        a = a + 1;
    }
    document.getElementById(pages[input]).style.display = "block";
    document.getElementById(pages[input] + "Button").classList.add("pressed");
}