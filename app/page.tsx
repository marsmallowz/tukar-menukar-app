import React from "react";
import Carousel from "../components/Carousel";
import { getPopularSkills } from "./actions/skillActions";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const popularSkills = await getPopularSkills();
  const swapSteps = [
    {
      id: 1,
      title: "Daftar",
      details:
        "melakukan pendaftaran terlebih dahulu dengan email dan username.",
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
      id: 3,
      title: "Buat persetujuan",
      details:
        "persetujuan dibuat untuk mendata pertukaran, seperti status pertukaran, tanggal pertukaran, keterampilan yang ditukar dan lain sebagainya. ",
    },
  ];

  const features = [
    {
      id: 1,
      title: "Exchange",
      details:
        "Digunakan sebagai kontrak persetujuan pertukaran antar pengguna.",
    },
    {
      id: 2,
      title: "Review",
      details:
        "Digunakan untuk melihat ulasan pengguna apakah benar-benar memiliki keterampilan yang memadai.",
    },
    {
      id: 3,
      title: "Popular Skills",
      details:
        "Digunakan untuk melihat skill yang disediakan maupun skill yang dibutuhkan.",
    },
  ];
  return (
    <main>
      <div className="text-gray-900 text-2xl font-bold text-center w-3/4 mx-auto">
        Tukar keterampilan anda dengan keterampilan orang lain.
      </div>
      <div className="py-5 text-center text-gray-500">
        Dengan <span className="font-semibold">Tukar-Menukar</span> kamu dapat
        belajar keterampilan baru. Cari orang yang membutuhkan keterampilan kamu
        dan orang yang kamu butuh keterampilannya.
      </div>
      <div className="flex gap-5 justify-center items-center">
        <Link
          href={"/register"}
          className="p-3  text-white font-semibold bg-gray-600 hover:bg-gray-700 cursor-pointer "
        >
          Daftar Gratis
        </Link>
        <Link
          href={"/about"}
          className="p-3 text-gray-900 font-medium border bg-white hover:bg-gray-100 cursor-pointer "
        >
          Baca Selengkapnya
        </Link>
      </div>
      <Carousel />

      <div className="text-xl font-bold">Popular Skills</div>
      {popularSkills.length ? (
        <ul className="list-decimal space-y-1">
          {popularSkills.map((skill) => {
            return (
              <li key={skill.id} className="list-inside">
                {skill.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <div></div>
      )}
      <div className="flex flex-col my-6">
        <div>
          <div className="text-gray-900 text-xl font-semibold">Fitur-fitur</div>
          <div>
            Berikut beberapa fitur yang disediakan aplikasi Tukar-Menukar:
          </div>
          <ul className="list-disc list-outside px-10">
            {features.map((feature) => {
              return (
                <li key={feature.id}>
                  <span className="font-semibold">{feature.title}</span>.{" "}
                  {feature.details}
                </li>
              );
            })}
          </ul>
        </div>
        <Image
          src={"/homepage/image-feature.png"}
          alt="gambar fitur"
          width={400}
          height={300}
          className="mx-auto py-4"
        />
      </div>
      <div className="flex flex-col mt-6 mb-5">
        <div className="text-gray-500">Penjelasan</div>
        <div>
          <div className="text-gray-900 text-xl font-semibold">
            Bagaimana cara menukar keterampilan?
          </div>
          <div>
            Untuk menukar keterampilan anda dengan keterampilan orang lain cukup
            mudah, berikut langkah-langkahnya:
          </div>
          <ul className="list-decimal list-outside px-10">
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
    </main>
  );
}
