import axios from 'axios'
//Untuk mengubah number menjadi formatted string
//Contoh:
//formatRupiah(20000)
//Output: "Rp 20.000"
export const formatRupiah = angka => "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Untuk mengubah string menjadi title case
export const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export const getDataUrlFromUrl = async url => axios.get(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))

export const dataURLtoFile = (dataUrl, filename) => {
    var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
     bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
     while(n--){
        u8arr[n] = bstr.charCodeAt(n);
     }
   return new File([u8arr], filename, {type:mime});
}

export const getFilenameFromUrl = url => /.*\/([^?]+)/.exec(url)[1]

export const getFileFromURL = async url => {
    const dataUrl = await getDataUrlFromUrl(url);
    return dataURLtoFile(dataUrl, getFilenameFromUrl(url))
}