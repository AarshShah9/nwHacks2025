import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useUser } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "First Recipe",
    description: "Complete your first recipe",
    icon: "🎯",
    exp: 50,
  },
  {
    id: 2,
    title: "Health Nut",
    description: "Cook 5 healthy recipes",
    icon: "🥗",
    exp: 100,
  },
  {
    id: 3,
    title: "Speed Chef",
    description: "Complete a recipe under 15 minutes",
    icon: "⚡",
    exp: 75,
  },
];

const TIERS = [
  {
    id: 1,
    title: "Line Cook",
    points: "0-100",
    description: "Just starting your culinary journey",
    icon: "👨‍🍳",
  },
  {
    id: 2,
    title: "Sous Chef",
    points: "101-250",
    description: "Getting comfortable in the kitchen",
    icon: "🔪",
  },
  {
    id: 3,
    title: "Head Chef",
    points: "251-500",
    description: "Leading the kitchen with confidence",
    icon: "🏆",
  },
  {
    id: 4,
    title: "Master Chef",
    points: "501-1000",
    description: "Creating culinary masterpieces",
    icon: "⭐",
  },
  {
    id: 5,
    title: "Gordon Ramsay",
    points: "1000+",
    description: "WHERE IS THE LAMB SAUCE?!",
    icon: "👑",
  },
];

export default function ProgressScreen() {
  const { profileData, loading } = useUser();

  const getLevel = (exp: number) => {
    if (exp >= 1000)
      return { level: 5, title: "Gordon Ramsay", nextLevel: 2000 };
    if (exp >= 500) return { level: 4, title: "Master Chef", nextLevel: 1000 };
    if (exp >= 250) return { level: 3, title: "Head Chef", nextLevel: 500 };
    if (exp >= 100) return { level: 2, title: "Sous Chef", nextLevel: 250 };
    return { level: 1, title: "Line Cook", nextLevel: 100 };
  };

  const calculateProgress = (exp: number) => {
    const levelInfo = getLevel(exp);
    const prevLevelThreshold =
      levelInfo.level > 1 ? [0, 100, 250, 500, 1000][levelInfo.level - 2] : 0;

    return (
      ((exp - prevLevelThreshold) /
        (levelInfo.nextLevel - prevLevelThreshold)) *
      100
    );
  };

  const currentExp = profileData?.exp || 0;
  const levelInfo = getLevel(currentExp);
  const progressPercentage = calculateProgress(currentExp);

  return (
    <ScrollView style={styles.container}>
      {/* Level Progress Card */}
      <View style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelNumber}>
              {loading ? "-" : levelInfo.level}
            </Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>
              {loading ? "Loading..." : levelInfo.title}
            </Text>
            <Text style={styles.expText}>
              {loading ? "-" : `${currentExp} XP`}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${loading ? 0 : progressPercentage}%` },
            ]}
          />
        </View>
        <Text style={styles.nextLevelText}>
          {loading
            ? ""
            : `${levelInfo.nextLevel - currentExp} XP to next level`}
        </Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Ionicons name="restaurant-outline" size={24} color="#8B4513" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Recipes Made</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="trash-bin-outline" size={24} color="#8B4513" />
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>Kg of Food Waste Saved</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="leaf-outline" size={24} color="#8B4513" />
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Kg of Carbon Reduced</Text>
          </View>
        </View>
      </View>

      {/* Tier Progression */}
      <View style={styles.tiersSection}>
        <Text style={styles.sectionTitle}>Cooking Tiers</Text>
        {TIERS.map((tier) => {
          const isCurrentTier = tier.id === levelInfo.level;
          const isCompleted = currentExp >= parseInt(tier.points.split("-")[0]);

          return (
            <View
              key={tier.id}
              style={[
                styles.tierCard,
                isCurrentTier && styles.currentTierCard,
                isCompleted && styles.completedTier,
              ]}
            >
              <View style={styles.tierHeader}>
                <Text style={styles.tierIcon}>{tier.icon}</Text>
                <View style={styles.tierTitleContainer}>
                  <Text style={styles.tierTitle}>{tier.title}</Text>
                  <Text style={styles.tierPoints}>{tier.points} XP</Text>
                </View>
                {isCurrentTier && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Current</Text>
                  </View>
                )}
              </View>
              <Text style={styles.tierDescription}>{tier.description}</Text>
            </View>
          );
        })}
      </View>

      {/* Achievements Section */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {ACHIEVEMENTS.map((achievement) => (
          <View key={achievement.id} style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDesc}>
                {achievement.description}
              </Text>
            </View>
            <Text style={styles.achievementExp}>+{achievement.exp} XP</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  levelCard: {
    backgroundColor: "#c8e6c9",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  levelBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8B4513",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  levelNumber: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  expText: {
    fontSize: 16,
    color: "#666",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#8B4513",
    borderRadius: 4,
  },
  nextLevelText: {
    textAlign: "center",
    marginTop: 10,
    color: "#666",
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  achievementsSection: {
    padding: 20,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  achievementDesc: {
    fontSize: 14,
    color: "#666",
  },
  achievementExp: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  tiersSection: {
    padding: 20,
  },
  tierCard: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  currentTierCard: {
    borderColor: "#8B4513",
    backgroundColor: "#fff",
  },
  completedTier: {
    backgroundColor: "#f0f8f0",
  },
  tierHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tierIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tierTitleContainer: {
    flex: 1,
  },
  tierTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tierPoints: {
    fontSize: 14,
    color: "#666",
  },
  tierDescription: {
    fontSize: 14,
    color: "#444",
  },
  currentBadge: {
    backgroundColor: "#8B4513",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
