 const projects = document.querySelector(".projects");

    projects.addEventListener("wheel", (event) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        if (projects.scrollWidth <= projects.clientWidth) return;

        const maxScrollLeft = projects.scrollWidth - projects.clientWidth;
        const nextScrollLeft = Math.max(
            0,
            Math.min(maxScrollLeft, projects.scrollLeft + event.deltaY)
        );

        if (nextScrollLeft !== projects.scrollLeft) {
            event.preventDefault();
            projects.scrollLeft = nextScrollLeft;
        }
    }, { passive: false });