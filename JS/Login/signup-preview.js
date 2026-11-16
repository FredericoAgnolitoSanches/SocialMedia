import { nameInput, photoInput, initials, previewName, profileImage } from "../constants";

let photoRequest = 0;
let photoTimer;

// Show de initials in the profile image
function updateNamePreview() {
    const name = nameInput.value.trim();
    const words = name.split(/\s+/).filter(Boolean);
    initials.textContent = words.slice(0, 2)
        .map(word => Array.from(word)[0]).join('').toLocaleUpperCase() || '?';
    previewName.textContent = name || 'Your name';
}

// Show profile image in the circle on sing up
function updatePhotoPreview() {
    clearTimeout(photoTimer);
    const request = ++photoRequest;
    profileImage.hidden = true;
    profileImage.removeAttribute('src');
    const value = photoInput.value.trim();

    // Only load web image URLs; keep the initials for empty or invalid values.
    try {
        const url = new URL(value);
        if (!['https:', 'http:'].includes(url.protocol)) return;
    } catch {
        return;
    }

    photoTimer = setTimeout(() => {
        const image = new Image();
        image.referrerPolicy = 'no-referrer';
        image.onload = () => {
            if (request !== photoRequest) return;
            profileImage.src = image.src;
            profileImage.hidden = false;
        };
        image.src = value;
    }, 300);
}

profileImage.addEventListener('error', () => {
    profileImage.hidden = true;
});
nameInput.addEventListener('input', updateNamePreview);
photoInput.addEventListener('input', updatePhotoPreview);
nameInput.form.addEventListener('reset', () => {
    setTimeout(() => {
        updateNamePreview();
        updatePhotoPreview();
    }, 0);
});
updateNamePreview();
updatePhotoPreview();
