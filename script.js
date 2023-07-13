window.onload = function () {
    const form = document.getElementById("dynamic-form");
    const defaultBtn = document.getElementById("default");
    const resetBtn = document.getElementById("reset");
    const saveBtn = document.getElementById("save");

    const initialProps = { ...data.props };

    function renderForm() {
        form.innerHTML = "";
        Object.entries(data.meta).forEach(([key, meta]) => {
            let inputHtml = "";
            switch (meta.type) {
                case "dropdown":
                    const optionsHtml = meta.values.map((option) => {
                        const [optValue, optLabel] = Object.entries(option)[0];
                        return `<option value="${optValue}" ${
                            data.props[key] === optValue ? "selected" : ""
                        }>${optLabel}</option>`;
                    }).join("");
                    inputHtml = `<select id="${key}">${optionsHtml}</select>`;
                    break;
                case "checkbox":
                    inputHtml = `<input type="checkbox" id="${key}" ${
                        data.props[key] === "true" ? "checked" : ""
                    } />`;
                    break;
                case "radio":
                    inputHtml = meta.values
                        .map((option) => {
                            const [optValue, optLabel] = Object.entries(option)[0];
                            return `<input type="radio" name="${key}" value="${optValue}" ${
                                data.props[key] === optValue ? "checked" : ""
                            } /> ${optLabel}`;
                        })
                        .join("");
                    break;
                case "input":
                    inputHtml = `<input type="text" id="${key}" value="${data.props[key]}" />`;
                    break;
                default:
                    inputHtml = "";
            }
            const div = document.createElement("div");
            div.innerHTML = `<label for="${key}">${meta.label}</label> ${inputHtml}`;
            form.appendChild(div);
        });
    }

    function updatePropsFromForm() {
        Object.entries(data.meta).forEach(([key, meta]) => {
            switch (meta.type) {
                case "dropdown":
                case "input":
                    data.props[key] = document.getElementById(key).value;
                    break;
                case "checkbox":
                    data.props[key] = document.getElementById(key).checked.toString();
                    break;
                case "radio":
                    const selectedRadio = document.querySelector(`input[name="${key}"]:checked`);
                    data.props[key] = selectedRadio ? selectedRadio.value : "";
                    break;
                default:
            }
        });
    }

    defaultBtn.addEventListener("click", () => {
        Object.keys(data.meta).forEach((key) => {
            data.props[key] = data.meta[key].defaultValue;
        });
        renderForm();
    });

    resetBtn.addEventListener("click", () => {
        data.props = { ...initialProps };
        renderForm();
    });

    saveBtn.addEventListener("click", () => {
        updatePropsFromForm();
        alert(JSON.stringify(data, null, 2));
    });

    renderForm();
};
