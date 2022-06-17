
//Untuk mengubah number menjadi formatted string
//Contoh:
//formatRupiah(20000)
//Output: "Rp 20.000"
export const formatRupiah = (angka) => "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");