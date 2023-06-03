import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    listview: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10, backgroundColor: 'white',
        paddingHorizontal: 15,
    }, //listview 마지막 child에 paddingBottom 추가

    text: { fontSize: 20, textAlign: 'center' },
    pillImage: { height: 60, width: 60, borderRadius: 30 },
    centerView: { flex: 1 },
    editImage: { width: 25, height: 25, opacity: 0.5 },
    time: {
        fontSize: 18,
        width: 100
    },

    pill: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 20,
        marginRight: 10,
    },

    pillText: {
        padding: 10,
        fontSize: 16,
    },

    pillImg: {
        width: 50,
        height: 50
    },

})