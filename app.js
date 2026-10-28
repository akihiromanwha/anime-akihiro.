/* ════════════════════════════════════════════════════════════
   AKIHIRODAIKYANIME — app.js v5.0 (AllAnime API - Súper Ligero)
   © 2026 AkihiroDaikyAnime — Todos los derechos reservados
   ════════════════════════════════════════════════════════════ */

const searchInput = document.getElementById('searchInput');
const animeGrid   = document.getElementById('animeGrid');
const statusEl    = document.getElementById('status');
const sectionTitle= document.getElementById('sectionTitle');
const modal       = document.getElementById('modal');
const modalContent= document.getElementById('modalContent');
const sortFilter  = document.getElementById('sortFilter');

let currentType = 'series';
// ⚠️ REEMPLAZA ESTO CON TU URL DE RENDER DEL PASO 1
const API_URL = 'https://allanime-api-xxxx.onrender.com';

/* ═══ TUS LINKS MANUALES ═══ */
const LINKS = {
  "Blood Lad": { "Terabox": { "1": "https://1024terabox.com/s/1SrOBd6ZnpoQZMkinzMjfaQ", "2": "https://1024terabox.com/s/1j1q1Q7PdKnAwNYJFKWiW8Q", "3": "https://1024terabox.com/s/1kvD32FuptXudTV4cwziyug", "4": "https://1024terabox.com/s/1Oo4EjJz-MVzvuzKgDyMr7w", "5": "https://1024terabox.com/s/11DlJfZqeitlWEVYa0Urv8g", "6": "https://1024terabox.com/s/1RgFWiI2xj-dhbWb1DQPrGQ", "7": "https://1024terabox.com/s/16kkM3LND-OgcHqz0gF5B4A", "8": "https://1024terabox.com/s/1w2y73FmI2YCzRb72RdWZeg", "9": "https://1024terabox.com/s/1kXyOiawXFF7wjWk-ls00cg", "10": "https://1024terabox.com/s/1I0fAabkE6dQXW2S0JZZCBw" } },
  "The Seven Deadly Sins": { "Drive": { "1": "https://drive.google.com/file/d/1pPpZu-YHdWfLL16lhWf_Cx1mR_ooVPBf/preview", "2": "https://drive.google.com/file/d/1f6Ioc2wVQWQWUmCZIssrwn7BWpgWG075/preview", "3": "https://drive.google.com/file/d/1zkCigw0VFWAt5-s0J8A-1qYB2WpL3grf/preview", "4": "https://drive.google.com/file/d/1RBFIPZboNAOIxpEcSYf41lKH2R8LZETj/preview", "5": "https://drive.google.com/file/d/14e145iN3ZiNfh4Iqq3q53sFVpux5j-E2/preview", "6": "https://drive.google.com/file/d/1DlNQlKbpqqgXOoIWnqmEBBJu-GOkDbqO/preview", "7": "https://drive.google.com/file/d/1atJ9IaNUs9H1K1V4xWFCkewauTK6R8dK/preview", "8": "https://drive.google.com/file/d/1iPGQeMiqBJPP1QjRzqGUt9Ic4hLawvYu/preview", "9": "https://drive.google.com/file/d/1zHdk6HjFd8byN4P16flklsAN7lgqfZkP/preview", "10": "https://drive.google.com/file/d/1MVsO3-oEKrbuqeIGOQ5PdOyUnxVmqSeJ/preview", "11": "https://drive.google.com/file/d/1YU3Hgm_r2EbxArZHcGT8OyshdrG3AmkG/preview", "12": "https://drive.google.com/file/d/1-OI_I_w0QJeCftpDUTzNgfKPAIs1Y6t9/preview", "13": "https://drive.google.com/file/d/1Y2TjbVupPfBcFb9NtI4nPUU2xwZPir7H/preview", "14": "https://drive.google.com/file/d/15I6craRG71Nv17A8JCKyfFAYbYKas92n/preview", "15": "https://drive.google.com/file/d/1wC06_XaEOkZgriH6y17QsO1g2zDzQGQB/preview", "16": "https://drive.google.com/file/d/1xyCxzmfCoeP-_cVI-cybRs_o5LXJ8M8B/preview", "17": "https://drive.google.com/file/d/1aCsxpYzI9iX_P212Ws3RvD6LYelw0tsM/preview", "18": "https://drive.google.com/file/d/1lJq4rZB0dS2J_SiZUgprtZrJaZMJyWCl/preview", "19": "https://drive.google.com/file/d/1sZC-19DU4Crb2lRTimYYgk9SUTr49-6k/preview", "20": "https://drive.google.com/file/d/1btaVxAq5On0MN0gsWDz72wzbLj-RuutK/preview", "21": "https://drive.google.com/file/d/1yK-1eSHcWGUK5gaGNh6mny0hOLtjNdTs/preview", "22": "https://drive.google.com/file/d/1blulkTyYo-YCnJfWi7hyha2Qs2yynD3d/preview", "23": "https://drive.google.com/file/d/138xmbqBi_dKlsqZOwgnDO4FKMbmf14XO/preview", "24": "https://drive.google.com/file/d/1dnb5JROpG7XhxUOLKYexc0H-HgKp6_QF/preview" } },
  "Jujutsu Kaisen": { "Drive": { "1": "https://drive.google.com/file/d/1MKpnI8y5HNIgJRD5EhVTeZhFt-oGLJrx/preview", "2": "https://drive.google.com/file/d/1zMkb-KIsQem6ENOmwbvpzZXQzT4SeNCn/preview", "3": "https://drive.google.com/file/d/12di4rm9bkwjn9kHuOHM3jU0B8cOrXnEN/preview", "4": "https://drive.google.com/file/d/1AQEDd2ifWdvW33gPq3lPsVE6r3xWr1Vk/preview", "5": "https://drive.google.com/file/d/1Ttkx7A0mFP2VlzqRn088ZgB_rtyxDHkL/preview", "6": "https://drive.google.com/file/d/1Pm2dCQdf3lqn4unEzwZJid6Qg7aaqg2f/preview", "7": "https://drive.google.com/file/d/1x5uvxrM-mmNZ9yai3iawLAG5fdJRECxP/preview", "8": "https://drive.google.com/file/d/1kT3W-uMbPgL3sbJmObfl3zKepnCM_rDy/preview", "9": "https://drive.google.com/file/d/1hy7Ihhv2JL5MZOQ5hg3uKMeZ1_L2qR9l/preview", "10": "https://drive.google.com/file/d/1UBeVtNowUxNKGOHjxxhObjzQlAn0iliM/preview", "11": "https://drive.google.com/file/d/1EHtS6_5IzdojjBamhQWpQr-3ybEEzmir/preview", "12": "https://drive.google.com/file/d/16vsiKOxSI-OmD94fTZQXzx9yFl1_vJnw/preview", "13": "https://drive.google.com/file/d/1PORkM3BKvm4vbx62XEbHIeheZ0feBRm5/preview", "14": "https://drive.google.com/file/d/1KjfBxvQGE740PStbGRV4hmKPmYdFZit0/preview", "15": "https://drive.google.com/file/d/1m9-JLClhJETAngWmvnxCBnkEdWaFOLTn/preview", "16": "https://drive.google.com/file/d/1NUoAzAspn-U8UBUk6dq3yRQxOLFHkRyq/preview", "17": "https://drive.google.com/file/d/1FGdIxVdFQTbUzgMLOqkF1AASO_eGGreB/preview", "18": "https://drive.google.com/file/d/1Fo08LWsVDNhLeoaAkfyDo3FsbTYDCJMK/preview", "19": "https://drive.google.com/file/d/1_7q5dhehjQ7LTcCOSwRm6p-UbdV5xODQ/preview", "20": "https://drive.google.com/file/d/1hCU-X46SAWM-0RODBywCqkH36RcTc0yc/preview", "21": "https://drive.google.com/file/d/19uMc_9lRpxArezYDYa7FWoL6yuoOw3Kp/preview", "22": "https://drive.google.com/file/d/1zd91GPoL0UMENy_u-QY1f8hmObHlShXO/preview", "23": "https://drive.google.com/file/d/1cQaLFhR5_IzYnR4_7XoyHbw1G3ih-mdN/preview", "24": "https://drive.google.com/file/d/1zTMk99bwXc1ahYO2K_YORwYVRsjzgDsk/preview" } },
  "DanMachi": { "Temporada 1": { "Drive": { "1": "https://drive.google.com/file/d/1zPG1b1j5DDmaBr_AXlIxoP2eXlRkJ8fi/preview", "2": "https://drive.google.com/file/d/1PmbNhAqn8K4BAduzt0PzLfSLpB-HVNrh/preview", "3": "https://drive.google.com/file/d/1ygyPKGc8yjpV7BYFz2DoU9i_QtKhkd_P/preview", "4": "https://drive.google.com/file/d/1SOTIpsPT5p9FRj8XQDexApZlWP0jqL2n/preview", "5": "https://drive.google.com/file/d/1COMLe6vcEgyWXNs5Pxrgmn43FfizNxsr/preview", "6": "https://drive.google.com/file/d/1aAtqniBvyF3R88lu6P52rx6i_MNrpFK0/preview", "7": "https://drive.google.com/file/d/1sl80epcMafCpNj-wYTV8DZq3SWNEd323/preview", "8": "https://drive.google.com/file/d/1F3lAQgRbrubrBxXbPKcbebTpb3g4lylE/preview", "9": "https://drive.google.com/file/d/1NSlIBsYu9A7dTs5WZAZuvTFYEqQ9Q-Z7/preview", "10": "https://drive.google.com/file/d/1XWa9C7IoGeVfF5ZCdU5oHYeHfjt8imuZ/preview", "11": "https://drive.google.com/file/d/10SBTX269uM2hP0mCsM8W-ziWDjm2q6TY/preview" } }, "Temporada 2": { "Drive": { "1": "AQUI_LINK_T2_EP1" } }, "Temporada 3": { "Drive": { "1": "AQUI_LINK_T3_EP1" } }, "Temporada 4": { "Drive": { "1": "AQUI_LINK_T4_EP1" } } },
  "Horimiya": { "Drive": { "1": "https://drive.google.com/file/d/11xNBnyOt9xJ9LJQyTgTZKMVvX_4AUofo/preview", "2": "https://drive.google.com/file/d/1lUFHpg9jpbHvQVw9cXmdHhMVCb1FagEL/preview", "3": "https://drive.google.com/file/d/1ua30nEgf6SZ3PnMiBsYH2KnHmDX6lzR7/preview", "4": "https://drive.google.com/file/d/18RkpoyB53R_eEtgKx7YlRynus1fdGC1f/preview", "5": "https://drive.google.com/file/d/1cKYL0Eq2cTolln44EjNkn1rVjLixSJ4S/preview", "6": "https://drive.google.com/file/d/1VNbfYSyXDEpfyGGWiwGM-QSZ8VAnXDTk/preview", "7": "https://drive.google.com/file/d/1eUn0ENkqj-O8_uzaE-dgdvvIc3rwZ-YB/preview", "8": "https://drive.google.com/file/d/1s1OA-rusNjgGCNi-svV6bswUOFswV-N4/preview", "9": "https://drive.google.com/file/d/1TX_niD-PqdFKpMKD-cUiRv5t-lhPEcVp/preview", "10": "https://drive.google.com/file/d/1ppciAbFdWAsICvPNB1d1C2LpHNN9bwln/preview", "11": "https://drive.google.com/file/d/1s8BdH6kytcTyB0rrcE7QAN7OLq0pmTFu/preview", "12": "https://drive.google.com/file/d/1AUUNJe-zd2npfcn5bbz0nw5zvkDjx3tv/preview", "13": "https://drive.google.com/file/d/1YVBrKSYu1GhGmGWUHBz6-R0KGkoAfCpS/preview" } },
  "100-man no Inochi no Ue ni Ore wa Tatteiru": { "Temporada 1": { "Drive": { "1": "https://drive.google.com/file/d/1fgplV-Qu9xlefull-taHRPpulcOi2x35/preview", "2": "https://drive.google.com/file/d/19IStDjFCeM4VrM35rVl418-zOo2THWgW/preview", "3": "https://drive.google.com/file/d/1jipTAs64m0FKK7Mzpr-I2UAgAiPAZ4Jk/preview", "4": "https://drive.google.com/file/d/19i8yh7pv594qlaBizQGiWGRcRM41en5Q/preview", "5": "https://drive.google.com/file/d/14JaLjg5adtZ8xY6sUxEyPqEcPH5c3ToL/preview", "6": "https://drive.google.com/file/d/19f6VCWgbNCQWT5iZtoEcJFdclrxulHq9/preview", "7": "https://drive.google.com/file/d/1fUNhCeWVm0Oj2jwKZO-m37XPsbMmW6eO/preview", "8": "https://drive.google.com/file/d/1TKogv2K0N-iQfG8QGcKMBdf7FbM9Zn3u/preview", "9": "https://drive.google.com/file/d/1ufI3wqsI_a-2i_VJ1fFnlrFlDZeq0p9x/preview", "10": "https://drive.google.com/file/d/1GqSPdjEtu_o-NhxK5VrpzYfEBzGYdMgI/preview", "11": "https://drive.google.com/file/d/1ewZym3UYeGAhRJ5zLgp2NOKGj-kLSogJ/preview", "12": "https://drive.google.com/file/d/1FkC4aQLz14ggEiXD-2YGP4MLwcbGAJ-k/preview" } }, "Temporada 2": { "Drive": { "1": "https://drive.google.com/file/d/1z_gJgNR0lOXYDbdoBAiUrA9S2pjnFlku/preview", "2": "https://drive.google.com/file/d/1yZCIu5gnBEqgkm0yzDvtjNPBqx8gqGPu/preview", "3": "https://drive.google.com/file/d/18CvdjQmVfBmxrLApHZlNeA7F5Z4FI2cx/preview", "4": "https://drive.google.com/file/d/16YMeb-8BbfJPXQJZsRu068dvgZ3WoHV7/preview", "5": "https://drive.google.com/file/d/1rbVbG0vLXAUfS0ofaHMeTsxgffsvzT6E/preview", "6": "https://drive.google.com/file/d/11lU1aF4ERPMj5r00gamE-P5vsVug4kcv/preview", "7": "https://drive.google.com/file/d/1LQ3eBEDoToSNH7W2hr37R_vHynO7aa8F/preview", "8": "https://drive.google.com/file/d/1whvdEeeaNc23meHRb9iEqNgWtsVP2Nr9/preview", "9": "https://drive.google.com/file/d/1v8O2Wd9y1cIXB1WLNHfvxXDOKN87jMYu/preview", "10": "https://drive.google.com/file/d/11bk9dSnIneWXWkguyizvoY0MW-k5Kpd9/preview", "11": "https://drive.google.com/file/d/19Br7KUYubwakyOF3mfx5qdH4XI4Evbt4/preview", "12": "https://drive.google.com/file/d/1FTYvjGluL6AIyjAf5k5Ue0f5kZoXwmQg/preview", "13": "https://drive.google.com/file/d/1ihqn2XF9BWKPuHk77VFXnA2mncQ7daA6/preview", "14": "https://drive.google.com/file/d/12og301d0ZxigsDRO9fxYCLV7NXCBFJh_/preview", "15": "https://drive.google.com/file/d/12ouUgwKB7m853Zpcc-Qfg1ZHJpbEBIg4/preview", "16": "https://drive.google.com/file/d/1zGFa8yuZSTB3cVUPh7iXjqBHRWe8y2Wh/preview", "17": "https://drive.google.com/file/d/17onpEsd9xOjY_bKTrfno9vXu-6_2d0VZ/preview", "18": "https://drive.google.com/file/d/1yKhTysDNoMP-3MGCc8alfgr2Y6Ynr6q4/preview", "19": "https://drive.google.com/file/d/1g_QjlSl57-6xQe3MGlLIU5wb_0F0XwEK/preview", "20": "https://drive.google.com/file/d/1vi6VVWBNKnIqQo6ksqZGSmDqb4AIku4e/preview", "21": "https://drive.google.com/file/d/1mrgIcBcgDrQz1gnJzgL8FBtUXeqnT2w1/preview", "22": "https://drive.google.com/file/d/1SNCcuymlHJikQnIOh8PkNoGZbAxjw4vb/preview", "23": "https://drive.google.com/file/d/1K4szfwHskOj12X_C2gd7zx7R-UwcDY-X/preview", "24": "https://drive.google.com/file/d/12ZEGdkTh7rqrRPnKzTCJY33Ph5KBHdJH/preview" } } },
  "Sword Art Online": { "Temporada 1": { "Drive": { "1": "https://drive.google.com/file/d/1LwDM_3phBwONtpap9FEzai5uNpus09OV/preview", "2": "https://drive.google.com/file/d/1NiqgbvHoVmdgBzF9_xU3wGuHzIjipgEq/preview", "3": "https://drive.google.com/file/d/15jgY4Nj_y0relL5OYB2HXXU7iMdLCxm6/preview", "4": "https://drive.google.com/file/d/1bAatZ-UVbVHDUrfFC8HCan3Wr6V6-qUm/preview", "5": "https://drive.google.com/file/d/1o0rKitZONARPIdYdJb0faOlfB0-c9B5m/preview", "6": "https://drive.google.com/file/d/1ij3OcSM8m349H56JGlwAl8sfUubkac8p/preview", "7": "https://drive.google.com/file/d/1w4-zmkTgTLdyrkPqCJq_CtnlgeyxXOzD/preview", "8": "https://drive.google.com/file/d/1XSf7QIollSJe6Y_U5xjbNPzAhJqOug4I/preview", "9": "https://drive.google.com/file/d/1Ne10wyullOjW9RGEkkqYi7CQbO_J8_aY/preview", "10": "https://drive.google.com/file/d/18u8ve_ZFL4cnaPLgU4ugim8DUrIEv1le/preview", "11": "https://drive.google.com/file/d/1ufNNp5C3YaSj1GeZOqGuDyeohhBSbaye/preview", "12": "https://drive.google.com/file/d/1lxTxqMMfAYxsUOzMgdi6GMuL0wQv1GnS/preview", "13": "https://drive.google.com/file/d/19zDIZWzTL4fguS1ci9v7DK8ApsEzD5sF/preview", "14": "https://drive.google.com/file/d/1mqMmDX4iv_C6njiB5YBwrzN912fJCoct/preview", "15": "https://drive.google.com/file/d/1f9O6tjYv_d8adu6EruBI0ZffGDM0sa-K/preview", "16": "https://drive.google.com/file/d/1WgvntQ1ZGo4F9pfIpkWZfd871WzuarHH/preview", "17": "https://drive.google.com/file/d/1sDfl4PMlshChy8M-60PSRFQket3eocHf/preview", "18": "https://drive.google.com/file/d/1SX8yzVVpe0Yal6Cbx8I1I6vr73A-ZrfW/preview", "19": "https://drive.google.com/file/d/1klaGbyQfil6UzstnTnYgyNQ9xkSpGtRU/preview", "20": "https://drive.google.com/file/d/1u5TKQx9zlU8j_-RDvCyN47Hz0putUI1-/preview", "21": "https://drive.google.com/file/d/1ZS305PQ7laS8HGcQAYA1x1CCPE_QRyRo/preview", "22": "https://drive.google.com/file/d/1nLAFptZWp_BBc_lJklJZj-5aOo70tvcs/preview", "23": "https://drive.google.com/file/d/1BAKYcisM1YB1_B4oTb-gQvRMHsxw5XRq/preview", "24": "https://drive.google.com/file/d/1HPL3UZwfkQ0kvvWLMOPq9-l48tfvah3i/preview", "25": "https://drive.google.com/file/d/1n1c7CyBLsHdmgStZcPIcYmMFs9QVVySV/preview", "26": "https://drive.google.com/file/d/1zFioyA2TF8dPkvvN1cCnuDDKfUQehLqc/preview" } }, "Temporada 2": { "Drive": { "1": "https://drive.google.com/file/d/1KPI_liqMdCyCYakONQH1xR2Z5E-O6VbV/preview", "2": "https://drive.google.com/file/d/1hxqTpmFQKaAEmPxqBkYBPBbxAoQYWXZq/preview", "3": "https://drive.google.com/file/d/1wCag274hU5y4tqwFFe26QdOBQ3fOVX1D/preview", "4": "https://drive.google.com/file/d/18He5dCq4Uy0_-sbBAOKRb1hFOmsgbwMM/preview", "5": "https://drive.google.com/file/d/1D6eEp_wimApDVP_3wHX_VtkKiA9Jmk3V/preview", "6": "https://drive.google.com/file/d/1E05xmz_8gJj8qSN8d7rnHWyCmiD_OLTI/preview", "7": "https://drive.google.com/file/d/16-h87O-Ai-_ntzkQgv6nLxnWieYlXDl8/preview", "8": "https://drive.google.com/file/d/1pazAuJdFDQ9-LX0kWe4b08JFDlpHeP8U/preview", "9": "https://drive.google.com/file/d/1g9WnKBbbe2Bp5xXPa4tGT4Ws5uzloz78/preview", "10": "https://drive.google.com/file/d/1Ro4AAf_oF62AI9zSDOvhIXe1RwKw60pd/preview", "11": "https://drive.google.com/file/d/1apfS5KvQB7-yRovtfpVotR_S408KKdT_/preview", "12": "https://drive.google.com/file/d/1QZMzktuonJFgk-fLNJ71QCl65Ao83ebG/preview", "13": "https://drive.google.com/file/d/1zHpN3OfUTfRikyiFYwl88wjpLea07LpK/preview", "14": "https://drive.google.com/file/d/10YB7k6lEzqI0kJFBtY1vlhWdpBQGmv9f/preview", "15": "https://drive.google.com/file/d/1lADilLTzxeWtS7GzJQEFGFzJA5OiKHzi/preview", "16": "https://drive.google.com/file/d/1ODlizl7EsytMDRbnkfYA7K6bJ-W7kenX/preview", "17": "https://drive.google.com/file/d/1SKqHom5RQ7TMa-zgGmvjXje17mtLBLx3/preview", "18": "https://drive.google.com/file/d/1rz0uiydoc_HFiJI5dDj3H2LTk7i4a96-/preview", "19": "https://drive.google.com/file/d/1ShiroVx_0i1AI_U_eM1bMSv7CokLVL53/preview", "20": "https://drive.google.com/file/d/1PFIsU3uoJtUOnLESTFa7vn5n4UGhG9kY/preview", "21": "https://drive.google.com/file/d/1VJB1npIS6m-jqwT0asWSJ8AMw1KL4dSG/preview", "22": "https://drive.google.com/file/d/1Gzmonh_pgjLLFmNDTHNLtEISyjPdtiM8/preview", "23": "https://drive.google.com/file/d/1Yg5kfcmBqGdysuQmZG-c-MdE93w0sYFb/preview", "24": "https://drive.google.com/file/d/1SeOB_gRO02JTUGudbQAjKrkj0KF9XFTk/preview", "25": "https://drive.google.com/file/d/1d1g3PsahhvnTuN1LJI1j4sLxnEf8uKvi/preview" } } },
  "Owari no Seraph": { "Drive": { "1": "AQUI_LINK_EP1", "2": "AQUI_LINK_EP2", "3": "AQUI_LINK_EP3" } }
};

const SERVER_ICONS = { "terabox": "🟦", "drive": "🟢", "mega": "🟥", "default": "🎬" };
function serverIcon(name){ const k = name.toLowerCase(); for (const [key, icon] of Object.entries(SERVER_ICONS)){ if (k.includes(key)) return icon; } return SERVER_ICONS.default; }

function normalize(s){ return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim(); }
function esc(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function getAnimeLinks(title){ if (!title) return null; if (LINKS[title]) return LINKS[title]; const n = normalize(title); for (const [k, v] of Object.entries(LINKS)){ if (normalize(k) === n) return v; } return null; }

const CUSTOM_SERIES = [
  { title: "Blood Lad", genres: ["Action","Comedy"], episodes: 10, cover: "https://img.anili.st/media/11633" },
  { title: "The Seven Deadly Sins", genres: ["Action","Fantasy"], episodes: 24, cover: "https://img.anili.st/media/20789" },
  { title: "Jujutsu Kaisen", genres: ["Action","Supernatural"], episodes: 24, cover: "https://img.anili.st/media/113415" },
  { title: "DanMachi", genres: ["Action","Fantasy"], episodes: 59, cover: "https://img.anili.st/media/20920" },
  { title: "Horimiya", genres: ["Romance","Comedy"], episodes: 13, cover: "https://img.anili.st/media/124194" },
  { title: "100-man no Inochi no Ue ni Ore wa Tatteiru", genres: ["Action","Fantasy"], episodes: 36, cover: "https://img.anili.st/media/114753" },
  { title: "Sword Art Online", genres: ["Action","Adventure"], episodes: 51, cover: "https://img.anili.st/media/20507" },
  { title: "Owari no Seraph", genres: ["Action","Drama","Supernatural","Vampire"], episodes: 12, cover: "https://img.anili.st/media/20755" }
];

const CUSTOM_MOVIES = [];
let catalogSeries = [...CUSTOM_SERIES];
let catalogMovies = [...CUSTOM_MOVIES];
let catalogAll = [...catalogSeries, ...catalogMovies];
let catalog = [...catalogSeries];

function render(list){
  animeGrid.innerHTML = '';
  if(!list.length){ animeGrid.innerHTML = '<p style="padding:1rem;color:#999;">No encontramos ese título.</p>'; return; }
  list.forEach((a,i)=>{
    const card = document.createElement('article');
    card.className = 'card';
    const readyBadge = LINKS[a.title] ? `<span class="badgeReady">Listo</span>` : '';
    const buttonText = a.isApi ? 'Buscar en línea' : (currentType === 'movies' ? 'Ver película' : 'Ver episodios');
    card.innerHTML = `
      ${readyBadge}
      <img class="cover" src="${esc(a.cover)}" alt="${esc(a.title)}" loading="lazy" decoding="async" onerror="this.style.display='none'">
      <div class="cardBody">
        <div class="title">${esc(a.title)}</div>
        <div class="meta">${esc((a.genres||[]).slice(0,2).join(' • '))} ${a.episodes && a.episodes > 1 ? `• ${a.episodes} eps.` : ''}</div>
        <button data-index="${i}">${buttonText}</button>
      </div>`;
    card.querySelector('button').onclick = () => openAnime(a);
    animeGrid.appendChild(card);
  });
}

function applyFilters(){
  const q = normalize(searchInput.value);
  const sort = sortFilter ? sortFilter.value : 'default';

  let filtered = catalog.filter(a => {
    const text = normalize([a.title, ...(a.genres||[])].join(' '));
    return (!q || text.includes(q));
  });

  if (filtered.length === 0 && searchInput.value.trim() !== '') {
    filtered.push({
      title: searchInput.value.trim(),
      genres: ["Búsqueda", "En línea"],
      episodes: 0,
      cover: `https://placehold.co/300x450/141414/dc143c?text=${encodeURIComponent(searchInput.value.trim())}`,
      isApi: true
    });
  }

  if (sort === 'az')           filtered.sort((a,b) => a.title.localeCompare(b.title));
  else if (sort === 'za')      filtered.sort((a,b) => b.title.localeCompare(a.title));

  const isMovies = currentType === 'movies';
  sectionTitle.textContent = q ? `Resultados para "${searchInput.value}"` : (isMovies ? 'Películas' : 'Animes');
  statusEl.textContent = `${filtered.length} título${filtered.length===1?'':'s'}.`;
  render(filtered);
}

let debounceTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(applyFilters, 400);
});

async function openAnime(a){
  const animeLinks = getAnimeLinks(a.title);
  const isMovie = currentType === 'movies';

  if (animeLinks && Object.keys(animeLinks).length) {
    const firstKey = Object.keys(animeLinks)[0];
    const firstValue = animeLinks[firstKey];
    const isSeasons = typeof firstValue === 'object' && typeof Object.values(firstValue)[0] === 'object';

    modalContent.innerHTML = `
      <img class="modalCover" src="${esc(a.cover)}" alt="">
      <div class="modalInfo"><h2>${esc(a.title)}</h2><p>${esc((a.genres||[]).join(', '))}</p></div>
      <div class="watchOptions">
        <div id="seasonTabsBox"></div>
        <p class="sectionTitle">Servidores</p>
        <div id="serverTabsBox"></div>
        <p class="sectionTitle">${isMovie ? 'Película' : 'Episodios'}</p>
        <div class="episodes" id="episodesBox"></div>
        <div id="playerBox"></div>
      </div>`;

    function showServers(linksObj){
      const servers = Object.keys(linksObj);
      const serverBox = document.getElementById('serverTabsBox');
      serverBox.innerHTML = `<div class="serverTabs">${servers.map((srv, i) => `
        <button class="serverTab${i===0?' active':''}" data-server="${esc(srv)}">${serverIcon(srv)} ${esc(srv)}</button>
      `).join('')}</div>`;
      showEpisodes(linksObj[servers[0]], servers[0]);
      serverBox.querySelectorAll('.serverTab').forEach(btn => {
        btn.onclick = () => {
          serverBox.querySelectorAll('.serverTab').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          showEpisodes(linksObj[btn.dataset.server], btn.dataset.server);
        };
      });
    }

    function showEpisodes(epsObj, serverName){
      const box = document.getElementById('episodesBox');
      const player = document.getElementById('playerBox');
      player.innerHTML = '';
      const keys = Object.keys(epsObj).sort((x,y) => Number(x) - Number(y));
      box.innerHTML = keys.map(num => `<button class="episode" data-link="${esc(epsObj[num])}" data-num="${esc(num)}">${isMovie ? 'Ver' : esc(num)}</button>`).join('');

      box.onclick = (e) => {
        const btn = e.target.closest('.episode');
        if (!btn) return;
        const link = btn.dataset.link;
        const num = btn.dataset.num;
        btn.classList.add('seen');

        if (link.includes('drive.google.com')){
          const match = link.match(/\/d\/([^/]+)/);
          const id = match ? match[1] : '';
          player.innerHTML = `<div class="playerHeader"><span>▶ ${isMovie ? 'Película' : 'Ep ' + esc(num)}</span><button class="closePlayer" onclick="document.getElementById('playerBox').innerHTML=''">✕</button></div>
            <iframe src="https://drive.google.com/file/d/${id}/preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        } else {
          window.open(link, '_blank', 'noopener');
        }
      };
    }

    if (isSeasons){
      const seasons = Object.keys(animeLinks);
      const seasonBox = document.getElementById('seasonTabsBox');
      seasonBox.innerHTML = `<p class="sectionTitle">Temporadas</p><div class="serverTabs">${seasons.map((s, i) => `
        <button class="seasonTab serverTab${i===0?' active':''}" data-season="${esc(s)}">${esc(s)}</button>
      `).join('')}</div>`;
      showServers(animeLinks[seasons[0]]);
      seasonBox.querySelectorAll('.seasonTab').forEach(btn => {
        btn.onclick = () => {
          seasonBox.querySelectorAll('.seasonTab').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          showServers(animeLinks[btn.dataset.season]);
        };
      });
    } else {
      showServers(animeLinks);
    }
    modal.classList.remove('hidden');
    return;
  }

  /* FLUJO AUTOMÁTICO (AllAnime API) */
  modalContent.innerHTML = `<p style="text-align:center; padding: 2rem;">Buscando episodios...</p>`;
  modal.classList.remove('hidden');

  try {
    const searchRes = await fetch(`${API_URL}/anime/search?q=${encodeURIComponent(a.title)}&limit=1`);
    const searchData = await searchRes.json();
    if (!searchData.results || searchData.results.length === 0) throw new Error('No encontrado');

    const animeData = searchData.results[0];
    const animeId = animeData._id;

    // La API de AllAnime a veces devuelve los episodios en el mismo objeto de búsqueda o requiere otra llamada
    const epRes = await fetch(`${API_URL}/anime/info/${animeId}`);
    const epData = await epRes.json();
    const episodesList = epData.episodes || [];

    if (episodesList.length === 0) throw new Error('Sin episodios');

    modalContent.innerHTML = `
      <img class="modalCover" src="${esc(a.cover)}" alt="">
      <div class="modalInfo"><h2>${esc(a.title)}</h2><p>Auto</p></div>
      <div class="watchOptions">
        <p class="sectionTitle">Episodios</p>
        <div class="episodes" id="episodesBox">
          ${episodesList.map(ep => `
            <button class="episode" data-ep-num="${ep.number}">${ep.number}</button>
          `).join('')}
        </div>
        <div id="playerBox"></div>
      </div>`;

    const epBox = document.getElementById('episodesBox');
    epBox.onclick = async (e) => {
       const btn = e.target.closest('.episode');
       if(!btn) return;
       const epNum = btn.dataset.epNum;
       const playerBox = document.getElementById('playerBox');
       playerBox.innerHTML = `<p style="text-align:center;">Cargando video...</p>`;

       try {
         // La API de AllAnime devuelve enlaces directos MP4
         const videoRes = await fetch(`${API_URL}/anime/watch/${animeId}/${epNum}`);
         const videoData = await videoRes.json();
         let videoUrl = videoData.sources?.[0]?.url; // A menudo es un MP4 directo
         if (!videoUrl) throw new Error('No hay servidor');

         playerBox.innerHTML = `<div class="playerHeader"><span>▶ Ep ${esc(epNum)}</span><button class="closePlayer" onclick="document.getElementById('playerBox').innerHTML=''">✕</button></div>
            <video id="plyrPlayer" playsinline controls crossorigin></video>`;
         const videoElement = document.getElementById('plyrPlayer');
         
         // Al ser MP4 directo, no se necesita HLS.js, haciendo la página más ligera
         videoElement.src = videoUrl;
         
         new Plyr(videoElement, { fullscreen: { enabled: true, fallback: true, iosNative: true } });
         btn.classList.add('seen');
       } catch(err) {
         playerBox.innerHTML = `<p style="text-align:center; color:#dc143c;">Error al cargar.</p>`;
       }
    };
  } catch (err) {
    modalContent.innerHTML = `
      <img class="modalCover" src="${esc(a.cover)}" alt="">
      <div class="modalInfo"><h2>${esc(a.title)}</h2></div>
      <p class="noLinks">No se encontraron episodios en la API.</p>`;
  }
}

document.getElementById('closeModal').onclick = () => modal.classList.add('hidden');
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
if (sortFilter) sortFilter.addEventListener('change', applyFilters);
document.getElementById('themeBtn').onclick = () => { document.body.classList.toggle('light'); };
document.querySelectorAll('.typeBtn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.typeBtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentType = btn.dataset.type;
    catalog = currentType === 'movies' ? catalogMovies : catalogSeries;
    applyFilters();
  };
});

statusEl.textContent = `Catálogo listo.`;
applyFilters();