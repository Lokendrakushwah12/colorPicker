const colorPicker = document.querySelector('.color-picker');
const PickedColors = JSON.parse(localStorage.getItem('picked-colors')) || [];

const colorContainer = document.querySelector('.color-container');
const options = document.querySelector('.options');
const clear = document.querySelector('.clear');

clear.addEventListener('click', () => {
    localStorage.clear();
    PickedColors.length = 0;
    DisplayColors();
});

const copyColor = (ele) => {
    const color = ele.innerHTML;
    navigator.clipboard.writeText(color);
    ele.innerHTML = 'Copied!';
    setTimeout(() => {
        ele.innerHTML = color;
    }, 500);
}
const DisplayColors = () => {
    if (PickedColors.length === 0) return;
    colorContainer.innerHTML = PickedColors.map((hex) =>
        `<div class="ele h-[50px] flex items-center justify-center cursor-pointer bg-[${hex}] text-[#000000d1] hover:text-[#000]">${hex}</div>`
    ).join("");

    document.querySelectorAll('.ele').forEach((ele) => {
        ele.style.backgroundColor = ele.innerHTML;
        ele.addEventListener('click', (e) => {
            copyColor(e.target);
        });
    });
}

DisplayColors();

const activateEyeDropper = async (e) => {
    document.body.style.display = 'none';
    try {
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        if (PickedColors.includes(sRGBHex)) return;
        navigator.clipboard.writeText(sRGBHex);
        PickedColors.push(sRGBHex);
        localStorage.setItem('picked-colors', JSON.stringify(PickedColors));
        DisplayColors();
    } catch (err) {
        console.error("Failed to copy color code!");
    }
    document.body.style.display = 'block';
}

colorPicker.addEventListener('click', activateEyeDropper);