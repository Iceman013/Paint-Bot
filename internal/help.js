function showPlans() {
    var file = document.createElement("embed");
    file.src = "internal/plans.md";
    file.type = "text/markdown";
    file.style.overflow = "hidden";
    file.width = "100%";
    makeModal("Plans", file);
    openModal();
}