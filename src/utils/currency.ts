export default function formatInEGP (value: number) {
    const pattern = Intl.NumberFormat("en-eg", {
        style: "currency",
        currency: "EGP"
    })

    return pattern.format(value);
}