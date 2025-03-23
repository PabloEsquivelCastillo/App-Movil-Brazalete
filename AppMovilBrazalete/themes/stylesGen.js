import { StyleSheet } from 'react-native';

const StylesGen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal:25,
    marginTop:8
  },
  scroll: {
    paddingRight: 10, // Agrega padding alrededor del contenido
    marginTop:10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4CAF89",
  },
  descrip: {
    fontSize: 18,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF89",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    marginBottom: 25,
    backgroundColor: "#fff",
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#66CC99",
    paddingVertical: 15,
    width:'100%',
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft:10,
    marginRight:10
  },
});

export default StylesGen;
