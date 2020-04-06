import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import * as MailCompose from 'expo-mail-composer';

import logoImg from '../../assets/logo.png'

import styles from './styles';

export default function Detail() {
  //Navegação entre telas
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;

  //Messagem que vai ser enviado para email ou whatsapp
  const message = `Ola ${incident.nome}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de R$${incident.value}`;
  //Vai voltar para tela anterior
  function navigationIncident() {
    navigation.goBack();

  }
  //Função que vai poder mandar um email 
  function sendMail() {
    MailCompose.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  };

  //Função que vai poder mandar um Whatsapp 
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigationIncident}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentPropety, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.nome} de {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentPropety}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentPropety}>Valor:</Text>
        <Text style={styles.incidentValue}>{incident.value}</Text>

      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso</Text>
        <Text style={styles.heroDescription}>Entre em contato</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
};