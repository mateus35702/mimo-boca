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
  useWindowDimensions,
  Platform,
  Image,
} from 'react-native';

const paginas = ['home', 'sobre', 'contato', 'servicos'];

// Imagem de perfil do site (pode ajustar o caminho/local)
const perfilImg = Platform.OS === 'web'
  ? '/logo-mimo-boca.png' // Caminho relativo para web
  : require('./assets/logo-mimo-boca.png'); // Para mobile, coloque a imagem em assets

export default function App() {
  const [pagina, setPagina] = useState('home');
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const lightAnim = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = useWindowDimensions();

  const index = paginas.indexOf(pagina);
  const buttonWidth = screenWidth / paginas.length;

  // Move a underline para o botão ativo, animando o deslocamento
  useEffect(() => {
    Animated.timing(underlineAnim, {
      toValue: index * buttonWidth,
      duration: 320,
      useNativeDriver: false,
    }).start();
  }, [pagina, buttonWidth]);

  // Loop contínuo do laser, sem reset abrupto
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(lightAnim, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: false,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [buttonWidth]);

  // Troca o título da aba conforme a página (web)
  useEffect(() => {
    if (Platform.OS === 'web') {
      let titulo;
      switch (pagina) {
        case 'home':
          titulo = 'Mimo Boca - Home';
          break;
        case 'sobre':
          titulo = 'Mimo Boca - Sobre';
          break;
        case 'contato':
          titulo = 'Mimo Boca - Contato';
          break;
        case 'servicos':
          titulo = 'Mimo Boca - Serviços';
          break;
        default:
          titulo = 'Mimo Boca';
      }
      document.title = titulo;
    }
  }, [pagina]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        pagina={pagina}
        setPagina={setPagina}
        underlineAnim={underlineAnim}
        buttonWidth={buttonWidth}
        lightAnim={lightAnim}
        screenWidth={screenWidth}
        perfilImg={perfilImg}
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

function Header({ pagina, setPagina, underlineAnim, buttonWidth, lightAnim, screenWidth, perfilImg }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <Image
          source={perfilImg}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Mimo Boca</Text>
      </View>
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
        {/* Underline animada responsiva, feixe de luz */}
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
          {/* Glow difuso (borda) */}
          <View style={styles.glow} />
          {/* Feixe central (laser) */}
          <View style={styles.laser} />
          {/* Feixe animado (movendo) */}
          <Animated.View
            style={[
              styles.laserMoving,
              {
                left: lightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['2%', '78%'],
                }),
              },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
}

function Home() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Bem-vindo a Mimo Boca</Text>
      <Text style={{ color: '#ddd' }}>A boca mais doce da quebrada</Text>
    </View>
  );
}

function Sobre() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Sobre nós</Text>
      <Text style={{ color: '#ddd' }}>
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
      <Text style={{ color: '#ddd' }}>Limpeza de boca</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23233a',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerLogo: {
    width: 38,
    height: 38,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
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
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
  },
  navButtonText: {
    color: '#666',
    fontSize: 16,
    userSelect: Platform.OS === 'web' ? 'none' : undefined,
  },
  navButtonTextActive: {
    color: '#ff2d2d',
    fontWeight: 'bold',
    textShadowColor: '#ff2d2d',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  underline: {
    position: 'absolute',
    height: 12,
    bottom: -6,
    borderRadius: 6,
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
    transitionProperty: Platform.OS === 'web' ? 'left, width' : undefined,
    transitionDuration: Platform.OS === 'web' ? '0.4s' : undefined,
  },
  glow: {
    position: 'absolute',
    top: 3,
    left: 0,
    right: 0,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#ff2d2d',
    opacity: 0.35,
    shadowColor: '#ff2d2d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  laser: {
    position: 'absolute',
    top: 5,
    left: '10%',
    width: '80%',
    height: 2,
    borderRadius: 2,
    backgroundColor: '#fff',
    shadowColor: '#ff2d2d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  laserMoving: {
    position: 'absolute',
    top: 2,
    width: '22%',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ff2d2d',
    opacity: 0.85,
    shadowColor: '#ff2d2d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 12,
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
    backgroundColor: '#ff2d2d',
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