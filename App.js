import React,{useState} from 'react';
import { SafeAreaView, View, Text,TouchableOpacity, StyleSheet,ScrollView,TextInput,Alert } from 'react-native';

export default function App() {
    const[pagina,setPagina] = useState('home');
    
    return(
        <SafeAreaView style={styles.container}>
        <Header pagina={pagina} setPagina={setPagina}/>
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


function Header({pagina,setPagina}){
  return(
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Mimo Boca</Text>
      <View style={styles.nav}>
        {['home','sobre','contato','servicos'].map((p) => (
          <TouchableOpacity
          key={p}
          style={[styles.navButton,pagina === p && styles.navButtonActive]}
          onPress={()=>setPagina(p)}
          >
            <Text style={styles.navButtonText}>{p.charAt(0).toUpperCase() + p.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function Home(){
  return(
    <View style={styles.section}>
      <Text style={styles.title}>Bem-vindo a Mimo Boca</Text>
      <Text>A boca mais doce da quebrada</Text>
    </View>
  );
}
function Sobre(){
  return(
    <View style={styles.section}>
      <Text style={styles.title}>Sobre nós</Text>
      <Text>Fundada em 2025, temos como missão proporcionar a melhor experiência para os nossos clientes</Text>
    </View>
  );
}
function Servicos(){
  return(
    <View style={styles.section}>
      <Text style={styles.title}>Nossos serviços</Text>
      <Text>Limpeza de boca</Text>
      
    </View>
  );
}
function Contato(){
  const[nome,setNome] = React.useState('');
  const[email,setEmail] = React.useState('');
  const[mensagem,setMensagem] = React.useState('');

  function enviar(){
    if(!nome || !email || !mensagem) {
      Alert.alert('Erro','Preencha todos os campos');
      return;
    }
    Alert.alert('Mensagem enviada com sucesso',`Obrigado, ${nome}!Retornaremos em breve.`);
    setNome('');
    setEmail('');
    setMensagem('');
  }
  return(
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
function Footer(){
  return(
    <View style={styles.footer}>
      <Text style={{color: 'white'}}>© 2025 Mimo Boca. Todos os direitos reservados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
  },
  header: {
    backgroundColor: '#004080',
    padding: 40,
    alignItems: 'center',
    alignContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  navButtonActive: {
    backgroundColor: '#0066cc',
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  section: {
 marginBottom: 20,
  },
  title: {
    fontSize: 25,
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
    marginBottom:15,
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
