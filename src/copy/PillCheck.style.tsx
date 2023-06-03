import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    listview: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5, backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 10,
    },

    time: {
        fontSize: 18,
        padding: 20,
        fontWeight: 'bold',
    },

    pill: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 20,
        marginRight: 10,
    },

    textView: {
        justifyContent: 'center',
    },

    pillText: {
        fontSize: 18,
    },

    pillImg: {
        borderRadius: 25,
        width: 50,
        height: 50,
        margin: 10
    },

})