import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
const { width } = Dimensions.get('window');

export default BrickList = ({
    data,
    rowHeight,
    columns,
    renderItem,
}) => {
    if (!Array.isArray(data) || !data) {
        throw new Error('Must pass in array for data');
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {data.map((prop) => {
                    if (prop.id === undefined) {
                        throw new Error("Objects in data must contain property 'id'");
                    }

                    if (prop.span === undefined) {
                        throw new Error("Objects in data must contain property 'span'");
                    }

                    return (
                        <View key={prop.id} style={{
                            width: (100 / columns) * prop.span+'%',
                            height: rowHeight,
                        }}>
                            {renderItem(prop)}
                        </View>
                    )
                })}

            </View>
        </ScrollView>
    )
}

BrickList.defaultProps = {
    data: [],
    columns: 3,
    rowHeight: width / 3,
}

BrickList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        span: PropTypes.number.isRequired,
    })),
    columns: PropTypes.number,
    rowHeight: PropTypes.number,
    renderItem: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection:'row',
        flexWrap: 'wrap'
    },
});
