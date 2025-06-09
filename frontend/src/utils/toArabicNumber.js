export function toArabicNumeral(en) {
    return ("" + en).replace(/[0-9]/g, function(t) {
        return "٠١٢٣٤٥٦٧٨٩".slice(+t, +t+1);
    });
}