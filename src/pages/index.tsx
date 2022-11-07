interface HomeProps {
  poolCount: number;
  guessesCount: number;
  userCountResponse: number;
}

import Image from "next/image";
import appPreviewImage from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import avatarImg from "../assets/user-avatars.png";
import iconCheck from "../assets/icon-Check.png";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";
export default function Home(props: HomeProps) {
  async function createPool(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert("Bolão criado com sucesso, codigo copiado");
      setPoolTitle("");
    } catch (err) {
      console.log(err);
      alert("Falha ao criar o bolão, tente novamente!");
    }
  }
  const [poolTitle, setPoolTitle] = useState("");

  return (
    <div className="max-w-[1124px]  h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="Logo from NLW " />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2 ">
          <Image src={avatarImg} alt="User avatar image " />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.guessesCount}</span>{" "}
            pessoas ja estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual é o nome do seu bolão"
            onChange={(e) => setPoolTitle(e.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600  flex items-center justify-between  text-gray-100">
          <div className="flex items-center gap-6 ">
            <Image src={iconCheck} alt="User avatar image " />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="User avatar image " />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImage} alt="previw NLW" />
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const [poolCountResponse, guessesCountResponse, userCountResponse] =
//     await Promise.all([
//       api.get("/pools/count"),
//       api.get("/guesses/count"),
//       api.get("/user/count"),
//     ]);
//   return {
//     props: {
//       poolCount: poolCountResponse.data.count,
//       guessesCount: guessesCountResponse.data.count,
//       userCountResponse: guessesCountResponse.data.count,
//     },
//   };
// };

//userCountResponse

export async function getStaticProps() {
  const [poolCountResponse, guessesCountResponse] = await Promise.all([
    api.get("/pools/count"),
    api.get("/guesses/count"),
    // api.get("/user/count"),
  ]);
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      userCountResponse: guessesCountResponse.data.count,
    },
  };
}
