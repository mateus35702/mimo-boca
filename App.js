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
  const lightAnim = useRef(new Animated.Value(0)).current;

  const index = paginas.indexOf(pagina);
  const buttonWidth = screenWidth / paginas.length;

  // Move a underline para o botão ativo, animando o deslocamento
  useEffect(() => {
    Animated.timing(underlineAnim, {
      toValue: index * buttonWidth,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [pagina]);

  // Animação loop da luz correndo dentro da underline
  useEffect(() => {
    lightAnim.setValue(0);
    Animated.loop(
      Animated.timing(lightAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        pagina={pagina}
        setPagina={setPagina}
        underlineAnim={underlineAnim}
        buttonWidth={buttonWidth}
        lightAnim={lightAnim}
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

function Header({ pagina, setPagina, underlineAnim, buttonWidth, lightAnim }) {
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

        {/* Underline animada correndo entre abas */}
        <Animated.View
          style={[
            styles.underline,
            {
              width: buttonWidth * 0.8,
              left: underlineAnim.interpolate({
                inputRange: [0, screenWidth - buttonWidth],
                outputRange: [buttonWidth * 0.1, screenWidth - buttonWidth + buttonWidth * 0.1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <View style={styles.underlineBackground} />
          <Animated.View
            style={[
              styles.runningLight,
              {
                left: lightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['-30%', '100%'],
                }),
              },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
}

// Páginas
function Home() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Bem-vindo a Mimo Boca</Text>
      <Text style={{color: '#ddd'}}>A boca mais doce da quebrada</Text>
    </View>
  );
}

function Sobre() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Sobre nós</Text>
      <Text style={{color: '#ddd'}}>
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
      <Text style={{color: '#ddd'}}>Limpeza de boca</Text>
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
    backgroundColor: '#0d0d0d',
  },

  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#fff',
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
    color: '#666',
    fontSize: 16,
  },
  navButtonTextActive: {
    color: '#00f0ff',
    fontWeight: 'bold',
    textShadowColor: '#00f0ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  underline: {
    position: 'absolute',
    height: 4,
    bottom: 0,
    borderRadius: 2,
    overflow: 'hidden',
  },
  underlineBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00f0ff',
    opacity: 0.3,
  },
  runningLight: {
    position: 'absolute',
    top: 0,
    width: '30%',
    height: '100%',
    backgroundColor: '#ffffff',
    opacity: 0.6,
    borderRadius: 2,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
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
    color: '#fff',
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