import ScheduleChart from "@/components/ScheduleChart";
import scheduleData from "@/data/schedule.json";
import { Calendar, Clock, Users } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function MyScheduleScreen() {
  const [schedule, setSchedule] = useState(scheduleData.weeklySchedule);
  const [stats, setStats] = useState(scheduleData.stats);

  const handleSlotPress = (day: string, time: string, status: string) => {
    const statusMessages = {
      booked: `${day.charAt(0).toUpperCase() + day.slice(1)} at ${time} is booked`,
      available: `${day.charAt(0).toUpperCase() + day.slice(1)} at ${time} is available for booking`,
      blocked: `${day.charAt(0).toUpperCase() + day.slice(1)} at ${time} is blocked`,
      empty: `${day.charAt(0).toUpperCase() + day.slice(1)} at ${time} is not scheduled`,
    };

    Alert.alert(
      "Time Slot",
      statusMessages[status as keyof typeof statusMessages] || "Unknown status",
      [
        { text: "OK", style: "default" },
        {
          text: "Edit",
          style: "default",
          onPress: () => console.log("Edit slot"),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="pt-4 pb-6 px-4">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            My Schedule
          </Text>
          <Text className="text-gray-600">
            Manage your availability and bookings
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="px-4 mb-6">
          <View className="flex-row space-x-3 mb-3">
            <View className="bg-white rounded-3xl shadow-lg p-4 flex-1">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-full bg-green-50 items-center justify-center mr-3">
                  <Calendar size={16} color="#10B981" />
                </View>
                <Text className="text-2xl font-bold text-green-600">
                  {stats.availableSlots}
                </Text>
              </View>
              <Text className="text-gray-600 text-sm">Available Slots</Text>
            </View>

            <View className="bg-white rounded-3xl shadow-lg p-4 flex-1">
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
                  <Users size={16} color="#3B82F6" />
                </View>
                <Text className="text-2xl font-bold text-blue-600">
                  {stats.bookedSlots}
                </Text>
              </View>
              <Text className="text-gray-600 text-sm">Booked</Text>
            </View>
          </View>

          <View className="bg-white rounded-3xl shadow-lg p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center mr-3">
                  <Clock size={16} color="#6B7280" />
                </View>
                <Text className="text-gray-800 font-semibold">
                  Total Weekly Slots
                </Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800">
                {stats.totalSlots}
              </Text>
            </View>
          </View>
        </View>

        {/* Schedule Chart */}
        <View className="px-4 mb-6">
          <ScheduleChart schedule={schedule} onSlotPress={handleSlotPress} />
        </View>

        {/* Recent Bookings */}
        <View className="px-4 mb-6">
          <View className="bg-white rounded-3xl shadow-lg p-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Recent Bookings
            </Text>

            {[
              {
                name: "Sarah Johnson",
                event: "Coffee Chat ☕",
                time: "Today, 2:00 PM",
                status: "confirmed",
              },
              {
                name: "Mike Chen",
                event: "Play football⚽",
                time: "Tomorrow, 10:00 AM",
                status: "pending",
              },
              {
                name: "Emma Wilson",
                event: "Coding Session 💻",
                time: "Friday, 3:00 PM",
                status: "confirmed",
              },
            ].map((booking, index) => (
              <View
                key={index}
                className="py-4 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-gray-800 font-semibold mb-1">
                      {booking.name}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {booking.event}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {booking.time}
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
