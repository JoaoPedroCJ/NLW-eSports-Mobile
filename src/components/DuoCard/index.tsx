import { View, TouchableOpacity, Text } from "react-native";
import { GameController } from 'phosphor-react-native'

import { DuoInfo } from "../DuoInfo";

import { styles } from "./styles";
import { THEME } from "../../theme";

export interface IDuoCardProps {
  id: string;
  name: string;
  yearsPlaying: number;
  weekDays: number[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

interface IProps {
  data: IDuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: IProps) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de Jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo label="Disponibilidade" value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`} />
      <DuoInfo label="Chamada de áudio" value={data.useVoiceChannel ? 'Sim' : 'Não'} colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
