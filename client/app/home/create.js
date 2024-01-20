import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

const create = () => {
  const colors = [
    "#FF5733", //Red
    "#FFD400", //Gold
    "#5D76A9",
    "#1877F2", //Medium Purple
    "#32CD32", //Lime Green
    "#CCCCFF", //Tomato
    "#4169E1", //Royal Blue
  ];

  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const [selectedColor, setSelectedColour] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  async function addHabit() {
    try {
      const habitDetails = {
        title: title,
        color: selectedColor,
        repeadMode: "daily",
        reminder: true,
      };

      const response = await axios.post(
        "http://192.168.25.122:8000/api/v1/habits/create",
        habitDetails
      );

      if (response.status === 200) {
        setTitle("");
        Alert.alert("Habit Added Successfuly!", "Ejoy practicing it.");
      }
    } catch (error) {
      console.log("Error while adding habit!");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <Ionicons
        onPress={() => router.back()}
        name="arrow-back"
        size={24}
        color="black"
      />
      <Text style={{ marginTop: 20, fontSize: 20 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit</Text>
      </Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          width: "95%",
          backgroundColor: "#E1EBEE",
          padding: 15,
          borderRadius: 8,
          marginTop: 15,
        }}
        placeholder="Title"
      />
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          {colors.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColour(item)}
              key={index}
              activeOpacity={0.8}
            >
              {selectedColor === item ? (
                <AntDesign name="plussquare" size={30} color={item} />
              ) : (
                <FontAwesome name="square" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Text style={{ fontSize: 18, fontWeight: "500" }}>Repeat</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "#AFDBF5",
            padding: 10,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center" }}>Daily</Text>
        </Pressable>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "#AFDBF5",
            padding: 10,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center" }}>Weekly</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 18, fontWeight: "500" }}>On These Days:</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {days.map((item, index) => (
          <Pressable
            key={index}
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#E0E0E0",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Reminder</Text>
        <Text style={{ fontSize: 18, fontWeight: "500", color: "#2774AE" }}>
          Yes
        </Text>
      </View>
      <TouchableOpacity
        onPress={addHabit}
        style={{
          backgroundColor: "#0042BC",
          marginTop: 25,
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default create;
