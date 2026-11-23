export const COMPANY_ADDRESS = {
  street: "Ganesh Glory 11, D/1003, SG Highway, near BSNL Office, Jagatpur",
  locality: "Ahmedabad",
  region: "Gujarat",
  postalCode: "382470",
  country: "IN",
};

// One string everywhere (footer, Contact, map) so it matches the listings character for character.
export const COMPANY_ADDRESS_LINE = `${COMPANY_ADDRESS.street}, ${COMPANY_ADDRESS.locality}, ${COMPANY_ADDRESS.region} ${COMPANY_ADDRESS.postalCode}`;

export const OFFICE_PHONE = { display: "+91 87993 31867", tel: "+918799331867", schema: "+91-8799331867" };
export const US_PHONE = { display: "+1 (623) 301-2035", tel: "+16233012035", schema: "+1-623-301-2035" };

export const OFFICE_HOURS_IST = "7:00 AM–7:00 PM IST";
export const OFFICE_HOURS_NOTE = "we arrange calls at times that suit your time zone";

export const CLUTCH_URL = "https://clutch.co/profile/amex-technology";
export const UPWORK_URL = "https://www.upwork.com/agencies/2067871097204619852/";

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY_ADDRESS_LINE)}&output=embed`;
export const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_ADDRESS_LINE)}`;
