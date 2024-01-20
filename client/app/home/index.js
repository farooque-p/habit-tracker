import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { Ionicons, AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import axios, { Axios } from "axios";
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";

const index = () => {
  const [option, setOption] = useState("Today");
  const router = useRouter();
  const [habits, setHabits] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState();
  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .slice(0, 3);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    fetchHabits();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  //console.log(currentDay);

  const fetchHabits = async () => {
    try {
      const response = await axios.get(
        "http://192.168.25.122:8000/api/v1/habits/all"
      );
      //console.log(response);
      setHabits(response.data);
    } catch (error) {
      console.log("Error while fetching habits!", error);
    }
  };
  //console.log("Habits: ", habits.length);
  const handleLongPress = (habitId) => {
    const selectedHabit = habits.find((habit) => habit._id == habitId);
    setSelectedHabit(selectedHabit);
    setIsModalVisible(true);
  };

  const handleCompletion = async () => {
    try {
      const habitId = selectedHabit._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true,
      };
      await axios.put(
        `http://192.168.25.122:8000/api/v1/habits/${habitId}/completed`,
        { completed: updatedCompletion }
      );
      await fetchHabits();
      setIsModalVisible(false);
    } catch (error) {
      console.log("Error while marking habit as completed!", error);
    }
  };

  // Filter Habits
  const filteredHabits = habits?.filter((habit) => {
    return !habit.completed || !habit.completed[currentDay];
  });
  //console.log("filtered habbits", habits);

  // Delete Habit
  const deleteHabit = async () => {
    try {
      const habitId = selectedHabit._id;

      const response = await axios.delete(
        `http://192.168.25.122:8000/api/v1/habits/${habitId}`
      );

      if (response == 200) {
        await fetchHabits();
        setIsModalVisible(false);
        setHabits(response.data);
      }
    } catch (error) {
      console.log("Error while deleting habit.");
    }
  };
  const getCompletedDays = (completedObj) => {
    if (completedObj && typeof completedObj === "object") {
      return Object.keys(completedObj).filter((day) => completedObj[day]);
    }

    return [];
  };

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Ionicons name="logo-foursquare" size={24} color="black" />
          <AntDesign
            onPress={() => router.push("/home/create")}
            name="plus"
            size={24}
            color="black"
          />
        </View>
        <Text style={{ marginTop: 10, fontSize: 24, fontWeight: "500" }}>
          Habits
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable
            onPress={() => setOption("Today")}
            style={{
              backgroundColor: option == "Today" ? "#E0FFFF" : "transparent",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center", color: "gray" }}>
              Today
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setOption("Weekly")}
            style={{
              backgroundColor: option == "Weekly" ? "#E0FFFF" : "transparent",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center", color: "gray" }}>
              Weekly
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setOption("Overall")}
            style={{
              backgroundColor: option == "Overall" ? "#E0FFFF" : "transparent",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center", color: "gray" }}>
              Overall
            </Text>
          </Pressable>
        </View>
        {option == "Today" &&
          (filteredHabits?.length > 0 ? (
            <View>
              {filteredHabits?.map((item, index) => (
                <Pressable
                  onLongPress={() => handleLongPress(item._id)}
                  key={index}
                  style={{
                    marginVertical: 10,
                    backgroundColor: item?.color,
                    padding: 12,
                    borderRadius: 24,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Image
                style={{ width: 250, height: 250, resizeMode: "cover" }}
                source={{
                  uri: "https://res.cloudinary.com/duivztddr/image/upload/v1705175084/uploads/not-found_p14jfw.jpg",
                }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                No Habits found for Today!
              </Text>
              <Pressable
                onPress={() => router.push("/home/create")}
                style={{
                  backgroundColor: "#0071C5",
                  marginTop: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  Create
                </Text>
              </Pressable>
            </View>
          ))}
        {option == "Weekly" && (
          <View>
            {habits.map((habit, index) => (
              <Pressable
                key={index}
                style={{
                  marginVertical: 10,
                  backgroundColor: habit.color,
                  padding: 15,
                  borderRadius: 24,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 15, fontWeight: "500", color: "white" }}
                  >
                    {habit?.title}
                  </Text>
                  <Text style={{ color: "white", textTransform: "capitalize" }}>
                    {habit?.repeatMode}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginVertical: 10,
                  }}
                >
                  {days.map((day, item) => {
                    const isCompleted = habit.completed && habit.completed[day];
                    return (
                      <Pressable>
                        <Text
                          style={{
                            color: day === currentDay ? "red" : "white",
                          }}
                        >
                          {day}
                        </Text>
                        {isCompleted ? (
                          <FontAwesome
                            name="circle"
                            size={24}
                            color="white"
                            style={{ marginTop: 12 }}
                          />
                        ) : (
                          <Feather
                            name="circle"
                            size={24}
                            color="white"
                            style={{ marginTop: 12 }}
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </Pressable>
            ))}
          </View>
        )}
        {option === "Overall" && (
          <View>
            {habits.map((habit, index) => (
              <>
                <Pressable
                  key={index}
                  style={{
                    marginVertical: 10,
                    backgroundColor: habit.color,
                    padding: 15,
                    borderRadius: 24,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      {habit.title}
                    </Text>
                    <Text
                      style={{ color: "white", textTransform: "capitalize" }}
                    >
                      {habit.repeatMode}
                    </Text>
                  </View>
                </Pressable>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Completed On:</Text>
                  <Text>{getCompletedDays(habit.completed).join(", ")}</Text>
                </View>
              </>
            ))}
          </View>
        )}
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        onBackButtonPress={() => setIsModalVisible(false)}
      >
        <View style={{ width: "100%", backgroundColor: "white", padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Choose Options:
          </Text>
          <Text style={{ marginVertical: 15 }}>Option</Text>
          <Pressable
            onPress={handleCompletion}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
            <Text style={{ fontSize: 16 }}>Completed</Text>
          </Pressable>
          <Pressable
            onPress={deleteHabit}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <AntDesign
              name="delete"
              size={24}
              color="black"
              style={{ marginTop: 10 }}
            />
            <Text style={{ fontSize: 16 }}>Delete</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default index;
