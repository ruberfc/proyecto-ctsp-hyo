const whatsappNumber = '51907107807';

export const siteContact = {
    phone: {
        display: '907 107 807',
    },
    whatsapp: {
        number: whatsappNumber,
        href: `https://wa.me/${whatsappNumber}`,
        message: 'Hola, deseo realizar una consulta.',
    },
    email: {
        display: 'informes@ctspjunin.org.pe',
        href: 'mailto:informes@ctspjunin.org.pe',
    },
    address: {
        display: 'Av. Giráldez 634 - Oficina 102 (Cámara de Comercio de Huancayo)',
        office: 'Av. Giráldez N° 634 - Oficina N° 102',
        reference: 'Cámara de Comercio de Huancayo',
    },
    officeHours: {
        weekdays: 'Lunes a Viernes: 10:00 am - 1:00 pm y 4:00 pm - 7:00 pm',
        saturday: 'Sábados: 9:00 am - 12:00 pm',
    },
    social: {
        facebook: 'https://www.facebook.com/profile.php?id=61572236218259',
        facebookEmbed: 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61572236218259&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId',
    },
    website: 'https://ctspjunin.org.pe',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.693002542821!2d-75.20660772536559!3d-12.064631188173578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e964b766cc34d%3A0xc7a9d95c12c72bfd!2sAv.%20Giráldez%20634%2C%20Huancayo%2012001!5e0!3m2!1ses-419!2spe!4v1748893886458!5m2!1ses-419!2spe',
} as const;