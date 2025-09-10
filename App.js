import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';

const paginas = ['home', 'sobre', 'contato', 'servicos'];
const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [pagina, setPagina] = useState('home');
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const index = paginas.indexOf(pagina);
  const buttonWidth = screenWidth / paginas.length;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(underlineAnim, {
        toValue: index * buttonWidth,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.4,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  }, [pagina]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        pagina={pagina}
        setPagina={setPagina}
        underlineAnim={underlineAnim}
        buttonWidth={buttonWidth}
        scaleAnim={scaleAnim}
      />
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

function Header({ pagina, setPagina, underlineAnim, buttonWidth, scaleAnim }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Mimo Boca</Text>
      <View style={styles.navWrapper}>
        <View style={styles.nav}>
          {paginas.map((p) => (
            <TouchableOpacity
              key={p}
              style={styles.navButton}
              onPress={() => setPagina(p)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.navButtonText,
                  pagina === p && styles.navButtonTextActive,
                ]}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Animated.View
          style={[
            styles.underline,
            {
              width: buttonWidth * 0.8,
              left: underlineAnim + buttonWidth * 0.1,
              transform: [{ scaleX: scaleAnim }],
            },
          ]}
        />
      </View>
    </View>
  );
}

// Páginas
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
        Fundada em 2025, temos como missão proporcionar a melhor experiência
        para os nossos clientes.
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
    Alert.alert(
      'Mensagem enviada com sucesso',
      `Obrigado, ${nome}! Retornaremos em breve.`
    );
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

// Rodapé
function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={{ color: 'white' }}>
        © 2025 Mimo Boca. Todos os direitos reservados.
      </Text>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },

  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  navWrapper: {
    position: 'relative',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navButtonText: {
    color: '#ccc',
    fontSize: 16,
  },
  navButtonTextActive: {
    color: '#00c6ff',
    fontWeight: 'bold',
  },
  underline: {
    position: 'absolute',
    height: 3,
    bottom: 0,
    backgroundColor: '#00c6ff',
    borderRadius: 2,
    shadowColor: '#00c6ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
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
