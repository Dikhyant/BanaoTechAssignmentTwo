import { 
    View,
    StyleSheet,
    Text
 } from "react-native"

const ContentUnavailable = () => {
    return (
        <View style={styles.container}>
            <Text>No content available</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default ContentUnavailable