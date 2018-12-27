<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.Retailer }}</td>
      <td>{{ props.item.Wholesaler }}</td>
      <td>{{ props.item.Distributer }}</td>
      <td>{{ props.item.Manufacturer }}</td>
      <td>{{ props.item.People }}</td>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: '房間名稱',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Retailer', value: 'Retailer'},
          { text: 'Wholesaler', value: 'Wholesaler' },
          { text: 'Distributer', value: 'Distributer' },
          { text: 'Manufacturer', value: 'Manufacturer' },
          { text: 'People', value: 'People' }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            Retailer: 159,
            Wholesaler: 6.0,
            Distributer: 24,
            Manufacturer: 4.0,
            People: 3
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            Retailer: 237,
            Wholesaler: 9.0,
            Distributer: 37,
            Manufacturer: 4.3,
            People: 2
          },
          {
            value: false,
            name: 'Eclair',
            Retailer: 262,
            Wholesaler: 16.0,
            Distributer: 23,
            Manufacturer: 6.0,
            People: 2
          },
          {
            value: false,
            name: 'Cupcake',
            Retailer: 305,
            Wholesaler: 3.7,
            Distributer: 67,
            Manufacturer: 4.3,
            People: 1
          },
          {
            value: false,
            name: 'Gingerbread',
            Retailer: 356,
            Wholesaler: 16.0,
            Distributer: 49,
            Manufacturer: 3.9,
            People: 2
          },
          {
            value: false,
            name: 'Jelly bean',
            Retailer: 375,
            Wholesaler: 0.0,
            Distributer: 94,
            Manufacturer: 0.0,
            People: 4
          },
          {
            value: false,
            name: 'Lollipop',
            Retailer: 392,
            Wholesaler: 0.2,
            Distributer: 98,
            Manufacturer: 0,
            People: 2
          }
        ]
      }
    }
  }
</script>