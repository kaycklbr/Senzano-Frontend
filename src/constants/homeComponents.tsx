import { Link } from "react-router";
import { Building, Gears, House, Keys, MedalRibbon, Sound, SSenzano } from "../icons";

export const serviceItems = [
  {
    id: 'venda',
    icon: House,
    label: 'VENDA',
    link: '/venda'
  },
  {
    id: 'locacao',
    icon: Keys,
    label: 'LOCAÇÃO',
    link: '/locacao'
  },
  {
    id: 'empreendimentos',
    icon: Building,
    label: 'EMPREENDIMENTOS',
    link: '/empreendimentos'
  },
  {
    id: 'lancamentos',
    icon: MedalRibbon,
    label: 'SÓ LANÇAMENTOS',
    link: '/lancamentos',
    hasSpecialIcon: true
  },
  {
    id: 'anuncie',
    icon: Sound,
    label: 'ANUNCIE AQUI',
    link: '/anuncie'
  },
  {
    id: 'gestao',
    icon: Gears,
    label: 'GESTÃO PATRIMONIAL',
    link: 'https://ebsgestaopatrimonial.com.br/',
    external: true
  }
];

export const destinationButtons = [
  {
    id: 'comercial',
    label: 'Comercial',
    link: '/locacao?destination=Comercial'
  },
  {
    id: 'residencial',
    label: 'Residencial',
    link: '/locacao?destination=Residencial'
  }
];