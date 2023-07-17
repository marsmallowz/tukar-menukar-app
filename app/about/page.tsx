import React from "react";

export default function Page() {
  const swapSteps = [
    {
      id: 1,
      title: "Daftar",
      details:
        "melakukan pendaftaran terlebih dahulu dengan email dan username, lalu cek email anda untuk melakukan verifikasi.",
    },
    {
      id: 2,
      title: "Atur Keterampilan",
      details:
        "atur keterampilan yang anda butuhkan dan keterampilan yang dapat anda sediakan.",
    },
    {
      id: 3,
      title: "Temukan Pengguna",
      details:
        "temukan pengguna yang menyediakan kemampuan yang kamu butuhkan, dan pengguna yang membutuhkan keterampilan anda.",
    },
    {
      id: 4,
      title: "Buat Exchange",
      details:
        "exchange dibuat untuk mendata pertukaran, seperti status pertukaran, tanggal pertukaran, keterampilan yang ditukar dan lain sebagainya.",
    },
    {
      id: 5,
      title: "Menunggu konfirmasi",
      details:
        "setelah exchange dibuat maka anda harus menunggu pengguna yang lain melakukan konfirmasi.",
    },
    {
      id: 5,
      title: "Review",
      details:
        "setelah status exchange COMPLETED maka anda dan pengguna lain dapat memberikan komentar dan rating untuk pertukaran yang telah dilakukan.",
    },
  ];

  return (
    <div>
      <div className="flex flex-col mt-6 mb-5">
        <div className="text-sm sm:text-base text-gray-500">Penjelasan</div>
        <div>
          <div className="text-base sm:text-xl text-gray-900 font-semibold">
            Bagaimana cara menukar keterampilan?
          </div>
          <div className="text-sm sm:text-base">
            Untuk menukar keterampilan anda dengan keterampilan orang lain cukup
            mudah, berikut langkah-langkahnya:
          </div>
          <ul className="text-sm sm:text-base list-decimal list-outside px-10">
            {swapSteps.map((step) => {
              return (
                <li key={step.id}>
                  <span className="font-semibold">{step.title}</span>,{" "}
                  {step.details}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
