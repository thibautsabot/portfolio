import fallback from "../assets/repository/fallback.jpeg";
import chess from "../assets/repository/chess.png";
import bananeplantee from "../assets/repository/bananeplantee.png";
import cordova from "../assets/repository/cordova.png";
import github from "../assets/repository/github.png";
import lol from "../assets/repository/lol.png";
import streamdeck from "../assets/repository/streamdeck.png";
import lbc from "../assets/repository/lbc.png";
import Image from "next/image";
import license from "../assets/repository/license.png";
import mailgo from "../assets/repository/mailgo.png";
import excalidraw from "../assets/repository/excalidraw.png";
import android from "../assets/repository/android.png";
import franz from "../assets/repository/franz.png";
import react from "../assets/repository/react.png";
import smartthings from "../assets/repository/smartthings.jpg";
import tools from "../assets/repository/tools.png";

const repositoryImage = {
  fallback: fallback,
  "chess-scrapper": chess,
  "banane-plantee": bananeplantee,
  "cordova-plugin-advanced-http": cordova,
  "cordova-universal-links-plugin": cordova,
  "github-reviews-ranking": github,
  "EloBuddy-Addons": lol,
  "streamdeck-plugin-smartthings": streamdeck,
  "typescript-streamdeck-boilerplate": streamdeck,
  "streamdeck-plugin-slack": streamdeck,
  "frontend-web-tools": lbc,
  "import-sort-style-lbc": lbc,
  mailgo: mailgo,
  "bypass-license-verification": license,
  excalidraw: excalidraw,
  "Dark-mode-Franz": franz,
  "universal-react-app-skeleton": react,
  tools: tools,
  "react-typescript-boilerplate": react,
  "react-exercices": react,
  "react-native-personal-intranet": react,
  SmartThingsPublic: smartthings,
  LePointRssFeed: android,
};

export default function RepositoryIcon({ name }) {
  return (
    <Image
      alt={`${name} icon`}
      src={repositoryImage[name] || repositoryImage["fallback"]}
      width={24}
      height={24}
    />
  );
}
