export default {
  name: "ItemRow",
  functional: true,
  props: {
    row: [Object, String],
    render: Function,
    index: Number,
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index,
    };
    return ctx.props.render(h, params);
  },
};
