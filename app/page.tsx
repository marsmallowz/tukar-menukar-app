import React from "react";
import Carousel from "../components/Carousel";
import { getPopularSkills } from "./actions/skillActions";
import Link from "next/link";
import Image from "next/image";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

  const popularSkills = await getPopularSkills();

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
        "Digunakan untuk melihat skill yang paling banyak disediakan maupun skill yang dibutuhkan.",
    },
  ];
  return (
    <main>
      <div className="mt-3 sm:mt-5 text-gray-900 text-lg w-11/12 font-bold text-center mx-auto sm:text-2xl sm:w-3/4">
        Tukar keterampilan anda dengan keterampilan orang lain.
      </div>
      <div className="py-3 text-center text-xs text-gray-500 sm:text-base sm:py-5 ">
        Dengan <span className="font-semibold">Tukar-Menukar</span> kamu dapat
        belajar keterampilan baru. Cari orang yang membutuhkan keterampilan kamu
        dan orang yang kamu butuh keterampilannya.
      </div>
      <div className="flex gap-5 justify-center items-center">
        {currentUser?.id ? (
          <>
            <Link
              href={"/users"}
              className="p-2 text-sm text-white font-semibold bg-gray-600 hover:bg-gray-700 cursor-pointer sm:text-base sm:p-3"
            >
              Temukan Pengguna
            </Link>
            <Link
              href={"/skills"}
              className="p-2 text-sm text-gray-900 font-medium border bg-white hover:bg-gray-100 cursor-pointer sm:text-base sm:p-3"
            >
              Atur Keterampilan
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/register"}
              className="p-2 text-sm text-white font-semibold bg-gray-600 hover:bg-gray-700 cursor-pointer sm:text-base sm:p-3"
            >
              Daftar Gratis
            </Link>
            <Link
              href={"/about"}
              className="p-2 text-sm text-gray-900 font-medium border bg-white hover:bg-gray-100 cursor-pointer sm:text-base sm:p-3"
            >
              Baca Selengkapnya
            </Link>
          </>
        )}
      </div>
      <Carousel />

      <div className="text-base sm:text-xl font-semibold">Popular Skills</div>
      {popularSkills.length ? (
        <ul className="text-sm sm:text-base list-decimal space-y-1">
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
          <div className="text-gray-900 text-base sm:text-xl font-semibold">
            Fitur-fitur
          </div>
          <div className="text-sm sm:text-base">
            Berikut beberapa fitur yang disediakan aplikasi Tukar-Menukar:
          </div>
          <ul className="text-sm sm:text-base list-disc list-outside px-10">
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
    </main>
  );
}
