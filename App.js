import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

export default function App() {
  const [pagina, setPagina] = useState('home');

  return (
    <SafeAreaView style={styles.container}>
      <Header pagina={pagina} setPagina={setPagina} />
      <ScrollView contentContainerStyle={styles.content}>
        {pagina === 'home' && <Home />}
        {pagina === 'sobre' && <Sobre />}
        {pagina === 'contato' && <Contato />}
        {pagina === 'servicos' && <Servicos />}
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

// NAVBAR MODERNA COM SCROLL HORIZONTAL
function Header({ pagina, setPagina }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Mimo Boca</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.nav}
        snapToAlignment="center"
        decelerationRate="fast"
      >
        {['home', 'sobre', 'contato', 'servicos'].map((p) => {
          const ativo = pagina === p;
          return (
            <TouchableOpacity
              key={p}
              onPress={() => setPagina(p)}
              style={[styles.navButton, ativo && styles.navButtonActive]}
            >
              <Text style={[styles.navButtonText, ativo && styles.navButtonTextActive]}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
              {ativo && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// PÁGINAS
function Home() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Bem-vindo a Mimo Boca</Text>
      <Text>A boca mais doce da quebrada</Text>
    </View>
  );
}

function Sobre() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Sobre nós</Text>
      <Text>
        Fundada em 2025, temos como missão proporcionar a melhor experiência para os nossos
        clientes.
      </Text>
    </View>
  );
}

function Servicos() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Nossos serviços</Text>
      <Text>Limpeza de boca</Text>
    </View>
  );
}

function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  function enviar() {
    if (!nome || !email || !mensagem) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    Alert.alert('Mensagem enviada com sucesso', `Obrigado, ${nome}! Retornaremos em breve.`);
    setNome('');
    setEmail('');
    setMensagem('');
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Contato</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mensagem"
        value={mensagem}
        onChangeText={setMensagem}
        style={styles.input}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={enviar}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

// RODAPÉ
function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={{ color: 'white' }}>© 2025 Mimo Boca. Todos os direitos reservados.</Text>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },

  // HEADER MODERNO
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },

  // NAVBAR COM SCROLL
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 12, // se não funcionar, use marginRight nos botões
  },
  navButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    position: 'relative',
    marginRight: 10,
  },
  navButtonActive: {
    backgroundColor: '#16213e',
  },
  navButtonText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '500',
  },
  navButtonTextActive: {
    color: '#00c6ff',
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    height: 3,
    width: '100%',
    backgroundColor: '#00c6ff',
    borderRadius: 2,
  },

  content: {
    padding: 20,
    flexGrow: 1,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#004080',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#00264d',
    padding: 15,
    alignItems: 'center',
  },
});
